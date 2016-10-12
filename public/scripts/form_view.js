var FormView,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

FormView = (function(superClass) {
  extend(FormView, superClass);

  function FormView() {
    this.invalid = bind(this.invalid, this);
    this.valid = bind(this.valid, this);
    FormView.__super__.constructor.apply(this, arguments);
    this.listenTo(this, 'render', this.hideActivityIndicator);
    this.listenTo(this, 'render', this.prepareModel);
    this.listenTo(this, 'save:form:success', this.success);
    this.listenTo(this, 'save:form:failure', this.failure);
  }

  FormView.prototype.delegateEvents = function(events) {
    this.ui = _.extend(this._baseUI(), _.result(this, 'ui'));
    this.events = _.extend(this._baseEvents(), _.result(this, 'events'));
    return FormView.__super__.delegateEvents.call(this, events);
  };

  FormView.prototype.tagName = 'form';

  FormView.prototype._baseUI = function() {
    return {
      submit: 'input[type="submit"]',
      activityIndicator: '.spinner'
    };
  };

  FormView.prototype._baseEvents = function() {
    var eventHash;
    eventHash = {
      'change [data-validation]': this.validateField,
      'blur [data-validation]': this.validateField,
      'keyup [data-validation]': this.validateField
    };
    eventHash["click " + this.ui.submit] = this.processForm;
    return eventHash;
  };

  FormView.prototype.createModel = function() {
    throw new Error('implement #createModel in your FormView subclass to return a Backbone model');
  };

  FormView.prototype.prepareModel = function() {
    this.model = this.createModel();
    return this.setupValidation();
  };

  FormView.prototype.validateField = function(e) {
    var validation, value;
    validation = $(e.target).attr('data-validation');
    value = $(e.target).val();
    if (this.model.preValidate(validation, value)) {
      return this.invalid(this, validation);
    } else {
      return this.valid(this, validation);
    }
  };

  FormView.prototype.processForm = function(e) {
    e.preventDefault();
    this.showActivityIndicator();
    this.updateModel();
    return this.saveModel();
  };

  FormView.prototype.updateModel = function() {
    throw new Error('implement #updateModel in your FormView subclass to update the attributes of @model');
  };

  FormView.prototype.saveModel = function() {
    var callbacks;
    callbacks = {
      success: (function(_this) {
        return function() {
          return _this.trigger('save:form:success', _this.model);
        };
      })(this),
      error: (function(_this) {
        return function() {
          return _this.trigger('save:form:failure', _this.model);
        };
      })(this)
    };
    return this.model.save({}, callbacks);
  };

  FormView.prototype.success = function(model) {
    this.render();
    return this.onSuccess(model);
  };

  FormView.prototype.onSuccess = function(model) {
    return null;
  };

  FormView.prototype.failure = function(model) {
    this.hideActivityIndicator();
    return this.onFailure(model);
  };

  FormView.prototype.onFailure = function(model) {
    return null;
  };

  FormView.prototype.showActivityIndicator = function() {
    this.ui.activityIndicator.show();
    return this.ui.submit.hide();
  };

  FormView.prototype.hideActivityIndicator = function() {
    this.ui.activityIndicator.hide();
    return this.ui.submit.show();
  };

  FormView.prototype.setupValidation = function() {
    Backbone.Validation.unbind(this);
    return Backbone.Validation.bind(this, {
      valid: this.valid,
      invalid: this.invalid
    });
  };

  FormView.prototype.valid = function(view, attr, selector) {
    return this.$("[data-validation=" + attr + "]").removeClass('invalid').addClass('valid');
  };

  FormView.prototype.invalid = function(view, attr, error, selector) {
    this.failure(this.model);
    return this.$("[data-validation=" + attr + "]").removeClass('valid').addClass('invalid');
  };

  return FormView;

})(Backbone.Marionette.ItemView);

// ---
// generated by coffee-script 1.9.2