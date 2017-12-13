'use strict';
var surabiControlController = function (SurabiControl) {


  function getSurabiControls(req, res) {
    var query = {},
      searchableFields = [
        'name',
        'displayName',
        'categories',
        'skills'
      ],
      page = req.query['page'] || 0,
      pageSize = req.query['pagesize'] || 10,
      sort = req.query['sort'] || null,
      direction = req.query['direction'] || 'asc',
      searchQuery = null;

    //build query
    searchableFields.forEach(function (fieldName) {
      if (req.query[fieldName]) {
        query[fieldName] = req.query[fieldName];
      }
    });

    searchQuery = SurabiControl.find(query)
      .skip(page * pageSize)
      .limit(+pageSize);

    if (sort) {
      var sortConfig = {};
      sortConfig[sort] = direction
      searchQuery = searchQuery.sort(sortConfig);
    }

    searchQuery.exec(
      function (err, controls) {
        if (err) {
          res.status(500).send(err);
        }
        else {
          SurabiControl.count(query).exec(function (countErr, count) {
            if (countErr) {
              res.status(500).send(countErr);
            } else {
              res.json({
                data: controls,
                totalRecords: count
              });
            }
          });
        }
      });
  }

  return {
    getSurabiControls
  };

}

module.exports = surabiControlController;
