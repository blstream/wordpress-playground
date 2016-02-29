define([
    "backbone",
    "models/blog.model"
], function (Backbone, BlogModel) {
    return Backbone.Collection.extend({
        model: BlogModel
    });
});