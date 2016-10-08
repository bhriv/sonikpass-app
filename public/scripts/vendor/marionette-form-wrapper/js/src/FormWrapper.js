// Uses Node, AMD or browser globals to create a module.

// If you do not want to support the browser global path, then you
// can remove the `root` use and the passing `this` as the first arg to
// the top function.

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['underscore', 'backbone', 'backbone.marionette', 'backbone-validation', 'backbone.syphon'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('underscore'), require('backbone'), require('backbone.marionette'), require('backbone-validation'), require('backbone.syphon'));
    } else {
        // Browser globals (root is window)
        root.FormWrapper = factory(root._, root.Backbone, root.Marionette);
    }
}(this, function (_, Backbone, Marionette) {
    var FormWrapper = Marionette.ItemView.extend({
        initialize: function (options) {
            if (!options.contentView) {
                throw 'No contentView provided.';
            }

            _.defaults(this, options, {
                noHtml5Validate: true
            });
            
            _.extend(this, _.pick(this.contentView, 'model', 'collection'));

            if (!this.model && !this.collection) {
                throw 'No collection or model provided.';
            }
        },

        tagName: 'form',

        template: false,

        events: {
            'blur input': 'validateInput',
            'change input[type="radio"], input[type="checkbox"]': 'validateInput',
            'click submit, button[data-role="submit"]': 'validateSubmit',
            'submit': 'validateSubmit'
        },

        validateInput: function (evt) {
            var el = evt.currentTarget,
                value = el.type === 'checkbox' ? el.checked : el.value,
                entity = this.getContentViewsEntity(this.getElementIndex(el));

            if (entity) {
                entity.set(el.name, value, {
                    validate: true
                });
            }
        },

        validateSubmit: function (e) {
            e.preventDefault();

            _.each(this.getContentViews(), this.validateFullForm, this);
        },

        validateFullForm: function (view) {
            var formData = this.serializeForm(view);
            view.model.set(formData, {
                validate: true
            });
        },

        serializeForm: function (view) {
            return Backbone.Syphon.serialize(view);
        },

        getContentViewsEntity: function (index) {
            var entity = this.model;

            if (this.collection) {
                entity = _.isNumber(index) ? this.collection.at(index) : this.collection;
            }

            return entity;
        },

        getContentViews: function () {
            var views = [this.contentView];

            if (this.contentView.children) {
                views = this.contentView.children.map(_.identity);
            }

            return views;
        },

        getElementIndex: function (element) {
            var index;

            if (parseInt(element.dataset['modelIndex'], 10)) {
                index = element.dataset['modelIndex'] - 1;
            } else {
                index = this.sbagIndex(element);
            }

            return index;
        },

        // Scientific BadAss Guess
        sbagIndex: function (el) {
            var views = this.getContentViews(),
                index = 0;

            if (!el) {
                return -1;
            }

            _.each(views, function (view, idx) {
                if (view.$(el).length === 1) {
                    index = idx;
                }
            }, this);

            return index;
        },

        bindValidationToViews: function () {
            _.each(this.getContentViews(), this.bindValidationToView, this);
        },

        bindValidationToView: function (view) {
            if (view.validationCallbacks) {
                Backbone.Validation.bind(view, view.validationCallbacks);
            } else {
                Backbone.Validation.bind(view);
            }
        },

        onRender: function () {
            if (this.noHtml5Validate) {
                this.$el.attr('novalidate', 'true');
            }

            this.$el.append(this.contentView.render().el);

            this.bindValidationToViews();

            return this;
        },

        onBeforeDestroy: function () {
            // Marionette.View
            if (typeof this.contentView.destroy === 'function') {
                this.contentView.destroy();
            } else { // Classic Backbone.View
                this.contentView.remove();
            }
        }
    });

    return FormWrapper;
}));
