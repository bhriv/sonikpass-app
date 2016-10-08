# `FormWrapper` component
The idea behind the `FormWrapper` is to have a black box that validates views for us.

`FormWrapper` works by taking a view (`ItemView`, `CollectionView` or `CompositeView`) as input, and giving back another view that you can then call `render` or `show` on.

## Dependencies

 - [Backbone.Validation](https://github.com/thedersen/backbone.validation)
 - [Backbone.Syphon](https://github.com/marionettejs/backbone.syphon)

## Prerequisites

### In case you pass an ```ItemView```:
 - needs to have a model bound to it
 - the Model needs to specify validation rules using `Backbone.Validation`
 - every field that you want to validate **needs to have a name property that matches the property name in the model**


**Example**

Template:

```
<input type="text" name="firstName" />
<input type="text" name="lastName" />
```

Model:
```
var Model = Backbone.Model.extend({
  validation: {
    firstName: {
      rangeLength: [1, 28]
    },
    lastName: {
      rangeLength: [1, 29]
    }
  }
});

```

### In case you pass a ```CollectionView``` or ```CompositeView```:

Every childView needs to respect the rules mentioned for the ItemView.

## How to use it

In case you pass an **ItemView**:

```
var viewToValidate = new Marionette.ItemView.extend({
  model: new Model()
});

var formWrapper = new FormWrapper({
  contentView: viewToValidate
});

formWrapper.render();
```

## Options
These are the options accepted by the constructor:

- ### `contentView` (Object, default: undefined, required: true)
The instance of the view that you want to validate.

- ### `noHtml5Validate` (Boolean, default: true, required: false)
Adds the `novalidate` attribute to the `form` element and prevent the validation of the new HTML5 input types.
