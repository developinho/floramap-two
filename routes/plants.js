exports.findAll = function(req, res) {
    res.send([{name:'plant1'}, {name:'plant2'}, {name:'plant3'}]);
};
 
exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};