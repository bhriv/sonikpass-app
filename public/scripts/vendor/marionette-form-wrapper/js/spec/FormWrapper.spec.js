define(function (require) {
    'use strict';

    var Backbone = require('backbone'),
        _ = require('underscore'),
        FormWrapper = require('src/FormWrapper'),
        Marionette = require('backbone.marionette');

    require('backbone-validation');

    describe('The Form Wrapper', function () {
        beforeEach(function () {
            spyOn(Backbone.Validation.callbacks, 'valid');
            spyOn(Backbone.Validation.callbacks, 'invalid');

            this.Model = Backbone.Model.extend({
                validation: {
                    field1: {
                        required: true
                    },
                    field2: {
                        required: true
                    }
                }
            });

            this.ItemView = Marionette.ItemView.extend({
                tagName: 'form',
                template: _.template('<input type="text" data-model-index="1" name="field1"/>' +
                '<input type="text" data-model-index="1" name="field2"/>' +
                '<button data-role="submit" type="button"></button>')
            });

            this.ItemViewNoIndex = Marionette.ItemView.extend({
                tagName: 'form',
                template: _.template('<input type="text" name="field1"/>' +
                '<input type="text" name="field2"/>' +
                '<button data-role="submit" type="button"></button>')
            });
        });

        afterEach(function () {
            if (this.formWrapper) {
                this.formWrapper.destroy();
                this.formWrapper = null;
            }
        });

        describe('when there is no contentView', function () {

            it('should throw an error', function () {
                expect(function () {
                    return new FormWrapper({
                    });
                }).toThrow('No contentView provided.');
            });

        });

        describe('the "noHtml5Validate" option', function () {
            beforeEach(function () {
                this.view = new this.ItemViewNoIndex({
                    model: new this.Model()
                });

                this.formWrapper = new FormWrapper({
                    contentView: this.view
                });

                this.formWrapper.render();
            });

            it('should by default add the "novalidate" attribute to the form', function () {
                expect(this.formWrapper.$el.attr('novalidate')).not.toBeUndefined();
            });

            describe('when disabled', function () {
                beforeEach(function () {
                    this.view = new this.ItemViewNoIndex({
                        model: new this.Model()
                    });

                    this.formWrapper = new FormWrapper({
                        contentView: this.view,
                        noHtml5Validate: false
                    });

                    this.formWrapper.render();
                });

                it('should not add the "novalidate" attribute to the form', function () {
                    expect(this.formWrapper.$el.attr('novalidate')).toBeUndefined();
                });
            });
        });

        describe('when there is a contentView without model or collection', function () {

            it('should throw an error', function () {
                expect(function () {
                    return new FormWrapper({
                        contentView: new Backbone.View()
                    });
                }).toThrow('No collection or model provided.');
            });

        });

        describe('when destroying', function () {

            describe('a Backbone View', function () {

                it('should remove the contentView', function () {
                    var contentView = new Backbone.View({
                        model: this.Model
                    });
                    spyOn(contentView, 'remove');
                    var formWrapper = new FormWrapper({
                        contentView: contentView
                    });
                    formWrapper.destroy();
                    expect(contentView.remove).toHaveBeenCalled();
                });

            });

            describe('a Marionette View', function () {

                it('should destroy the contentView', function () {
                    var contentView = new Marionette.ItemView({
                        model: this.Model
                    });
                    spyOn(contentView, 'destroy');
                    var formWrapper = new FormWrapper({
                        contentView: contentView
                    });
                    formWrapper.destroy();
                    expect(contentView.destroy).toHaveBeenCalled();
                });

            });

        });

        describe('when the input is an ItemView', function () {
            describe('that specifies a "data-model-index" attribute for every input to validate', function () {
                beforeEach(function () {
                    this.view = new this.ItemView({
                        model: new this.Model()
                    });
                });

                validateSingleView();
            });

            describe('that DOES NOT specify a "data-model-index" attribute for every input to validate', function () {
                beforeEach(function () {
                    this.view = new this.ItemViewNoIndex({
                        model: new this.Model()
                    });
                });

                validateSingleView();
            });
        });

        describe('when the input is a CollectionView', function () {
            describe('that specifies a "data-model-index" attribute for every input to validate', function () {
                beforeEach(function () {
                    var View = Marionette.CollectionView.extend({
                        childView: this.ItemView
                    });

                    var Collection = Backbone.Collection.extend({
                        model: this.Model
                    });

                    this.view = new View({
                        collection: new Collection([{}, {}, {}])
                    });
                });

                validateMultipleViews();
            });

            describe('that DOES NOT specify a "data-model-index" attribute for every input to validate', function () {
                beforeEach(function () {
                    var View = Marionette.CollectionView.extend({
                        childView: this.ItemViewNoIndex
                    });

                    var Collection = Backbone.Collection.extend({
                        model: this.Model
                    });

                    this.view = new View({
                        collection: new Collection([{}, {}, {}])
                    });
                });

                validateMultipleViews();
            });
        });

        describe('when the input is a CompositeView', function () {
            describe('that specifies a "data-model-index" attribute for every input to validate', function () {
                beforeEach(function () {
                    var View = Marionette.CompositeView.extend({
                        childView: this.ItemView,
                        template: _.template('<div></div>')
                    });

                    var Collection = Backbone.Collection.extend({
                        model: this.Model
                    });

                    this.view = new View({
                        collection: new Collection([{}, {}, {}])
                    });
                });

                validateMultipleViews();
            });

            describe('that DOES NOT specify a "data-model-index" attribute for every input to validate', function () {
                beforeEach(function () {
                    var View = Marionette.CompositeView.extend({
                        childView: this.ItemViewNoIndex,
                        template: _.template('<div></div>')
                    });

                    var Collection = Backbone.Collection.extend({
                        model: this.Model
                    });

                    this.view = new View({
                        collection: new Collection([{}, {}, {}])
                    });
                });

                validateMultipleViews();
            });
        });

        function validateSingleView () {
            beforeEach(function () {
                this.formWrapper = new FormWrapper({
                    contentView: this.view
                });

                this.formWrapper.render();
            });

            describe('when triggering the blur event', function () {
                describe('on a valid input', function () {
                    beforeEach(function () {
                        this.view.$('input[name="field1"]').val('test').trigger('blur');
                    });

                    it('should not fail validation', function () {
                        expect(Backbone.Validation.callbacks.valid.calls.count()).toEqual(1);
                        expect(Backbone.Validation.callbacks.invalid).not.toHaveBeenCalled();
                    });
                });

                describe('on an invalid input', function () {
                    beforeEach(function () {
                        this.view.$('input[name="field2"]').trigger('blur');
                    });

                    it('should fail validation', function () {
                        expect(Backbone.Validation.callbacks.valid).not.toHaveBeenCalled();
                        expect(Backbone.Validation.callbacks.invalid.calls.count()).toEqual(1);
                    });
                });
            });

            describe('when submitting', function () {
                describe('and the form fields are valid', function () {
                    beforeEach(function () {
                        this.view.$('input[name="field1"]').val('test');
                        this.view.$('input[name="field2"]').val('test');

                        this.view.$el.trigger('submit');
                    });

                    it('should not fail validation', function () {
                        expect(Backbone.Validation.callbacks.valid.calls.count()).toEqual(2);
                        expect(Backbone.Validation.callbacks.invalid).not.toHaveBeenCalled();
                    });
                });

                describe('and the form fields are not valid', function () {
                    beforeEach(function () {
                        this.view.$('input[name="field1"]').val('');
                        this.view.$('input[name="field2"]').val('');

                        this.view.$el.trigger('submit');
                    });

                    it('should fail validation', function () {
                        expect(Backbone.Validation.callbacks.valid).not.toHaveBeenCalled();
                        expect(Backbone.Validation.callbacks.invalid.calls.count()).toEqual(2);
                    });
                });
            });

            describe('when clicking on the submit button', function () {
                describe('and the form fields are valid', function () {
                    beforeEach(function () {
                        this.view.$('input[name="field1"]').val('test');
                        this.view.$('input[name="field2"]').val('test');

                        this.view.$('button[data-role="submit"]').trigger('click');
                    });

                    it('should not fail validation', function () {
                        expect(Backbone.Validation.callbacks.valid.calls.count()).toEqual(2);
                        expect(Backbone.Validation.callbacks.invalid).not.toHaveBeenCalled();
                    });
                });

                describe('and the form fields are not valid', function () {
                    beforeEach(function () {
                        this.view.$('input[name="field1"]').val('');
                        this.view.$('input[name="field2"]').val('');

                        this.view.$('button[data-role="submit"]').trigger('click');
                    });

                    it('should fail validation', function () {
                        expect(Backbone.Validation.callbacks.valid).not.toHaveBeenCalled();
                        expect(Backbone.Validation.callbacks.invalid.calls.count()).toEqual(2);
                    });
                });
            });
        }

        function validateMultipleViews () {
            beforeEach(function () {
                this.formWrapper = new FormWrapper({
                    contentView: this.view
                });

                this.formWrapper.render();
            });

            describe('when triggering the blur event', function () {
                describe('on an input', function () {
                    describe('that is valid', function () {
                        beforeEach(function () {
                            this.view.$('input[name="field1"]').first().val('test').trigger('blur');
                        });

                        it('should not fail validation', function () {
                            expect(Backbone.Validation.callbacks.valid.calls.count()).toEqual(1);
                            expect(Backbone.Validation.callbacks.invalid).not.toHaveBeenCalled();
                        });
                    });

                    describe('that is invalid', function () {
                        beforeEach(function () {
                            this.view.$('input[name="field1"]').first().val('').trigger('blur');
                        });

                        it('should fail validation', function () {
                            expect(Backbone.Validation.callbacks.valid).not.toHaveBeenCalled();
                            expect(Backbone.Validation.callbacks.invalid.calls.count()).toEqual(1);
                        });
                    });
                });

                describe('when clicking on the submit button in one of the forms', function () {
                    describe('and all fields in all forms are valid', function () {
                        beforeEach(function () {
                            var form = this.view.$('form').first();
                            form.find('input[name="field1"], input[name="field2"]').val('test');

                            form.find('button[data-role="submit"]').trigger('click');
                        });

                        it('should validate all forms and not fail validation', function () {
                            expect(Backbone.Validation.callbacks.valid.calls.count()).toEqual(2);
                            expect(Backbone.Validation.callbacks.invalid.calls.count()).toEqual(4);
                        });

                    });

                    describe('and any field in the forms is invalid', function () {
                        beforeEach(function () {
                            var form = this.view.$('form').first();

                            form.find('input[name="field1"]').val('test');
                            form.find('input[name="field2"]').val('');

                            form.find('button[data-role="submit"]').trigger('click');
                        });

                        it('should validate all forms and fail validation', function () {
                            expect(Backbone.Validation.callbacks.valid.calls.count()).toEqual(1);
                            expect(Backbone.Validation.callbacks.invalid.calls.count()).toEqual(5);
                        });
                    });
                });
            });
        }

        describe('#serializeForm', function () {
            beforeEach(function () {
                this.view = new this.ItemView({
                    model: new this.Model()
                });

                this.formWrapper = new FormWrapper({
                    contentView: this.view
                });

                this.formWrapper.render();

                this.formWrapper.$('input[name="field1"]').val('name');
                this.formWrapper.$('input[name="field2"]').val('surname');
            });

            it('should return the correct JSON representation of a form', function () {
                var serializedForm = this.formWrapper.serializeForm(this.view),
                expectedObject = {
                    field1: 'name',
                    field2: 'surname'
                };

                expect(serializedForm).toEqual(expectedObject);
            });
        });

    });

});
