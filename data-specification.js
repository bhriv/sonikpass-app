[
  '{{repeat(10, 10)}}', // Used to generate data for 10 accounts
  {
    index: '{{index()}}',    // API generated (Index of current cloned object starting from 0)
    account_id: '{{integer(0, 99999999)}}', // Database generated (integer)
    label : '',
    name :  '{{company().toUpperCase()}}',
    _id: '{{objectId()}}',   // API generated (globally unique identifier for object)
    // user data
    lifespan: [{
              id : '{{integer(0, 99999999)}}', // Database generated (unique integer)
              created : '{{date(new Date(2016, 0, 1), new Date(2016, 2, 1), "YYYY-MM-ddThh:mm:ss Z")}}',      // Database timestamp (Automatically created as the time the record was created)
              active_time : '{{date(new Date(2016, 3, 3), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',            // UI timestamp (UI - date/time input picker. UI defaults to current date/time i.e. "Now". If an authorization_device is currently enabled User gets warning that their current device will be disable upon Confirming the new device activation.)
              disable_time : '{{date(new Date(2017, 0, 1), new Date(2018, 2, 1), "YYYY-MM-ddThh:mm:ss Z")}}', // UI timestamp, Datbase default = null, (UI - date/time input picker can override. If "Deactivate Device" UI button is clicked then value defaults to current date/time i.e. "Now". If no authorization_devices have a pending active_time set user receives warning that they will have no active devices during a specified period.)
              is_enabled : '{{bool()}}' // Database boolean (UX - Only one device can be active at any time. UI - New devices can be scheduled to become active in the future at which point the previous device 'is_enabled' become false. User gets warning prior to confirming the 'enable' action.)
    }],
    billing_id : '{{integer(0, 99999)}}',
    secret : '{{objectId()}}',
    contact_id: '{{integer(1000, 999999)}}', // Database generated (unique integer)
    users: [
          '{{repeat(2)}}',
            {
              id : '{{integer(0, 99999999)}}', // Database generated (unique integer)
              username: '{{lorem(1, "words")}}.{{lorem(1, "words")}}', // UI string (UI - required field, text input, defaults to value of user.email.address) 
              need_facial_images: '{{bool()}}', // Database generated (boolean)
              contact : [{
                      given_name : '{{firstName()}}', // UI string (UI - text input, can be blank)
                      surname : '{{surname()}}'       // UI string (UI - text input, can be blank)
              }],
              email : [{
                      label : 'primary',        // UI string (UI - dropdown with optional text input, defaults to 'Primary') 
                      address : '{{email()}}',  // UI string, email format  (UI - required email input at initial signup step, multiple emails can be added with unique labels) 
                      confirmed : '{{bool()}}'  // Database generated (boolean)
              }],
              lifespan: [{
                        id : '{{integer(0, 99999999)}}', // Database generated (unique integer)
                        created : '{{date(new Date(2016, 0, 1), new Date(2016, 2, 1), "YYYY-MM-ddThh:mm:ss Z")}}',      // Database timestamp (Automatically created as the time the record was created)
                        active_time : '{{date(new Date(2016, 3, 3), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',            // UI timestamp (UI - date/time input picker. UI defaults to current date/time i.e. "Now". If an authorization_device is currently enabled User gets warning that their current device will be disable upon Confirming the new device activation.)
                        disable_time : '{{date(new Date(2017, 0, 1), new Date(2018, 2, 1), "YYYY-MM-ddThh:mm:ss Z")}}', // UI timestamp, Datbase default = null, (UI - date/time input picker can override. If "Deactivate Device" UI button is clicked then value defaults to current date/time i.e. "Now". If no authorization_devices have a pending active_time set user receives warning that they will have no active devices during a specified period.)
                        is_enabled : '{{bool()}}' // Database boolean (UX - Only one device can be active at any time. UI - New devices can be scheduled to become active in the future at which point the previous device 'is_enabled' become false. User gets warning prior to confirming the 'enable' action.)
              }],
              telephone : [{
                      label : 'primary',                       // UI string (UI - dropdown with optional text input, Defaults to 'Primary')
                      country_code : '+{{integer(1, 100)}}',   // UI integer (UI - dropdown populated by UI script, required field for saving valid number, defaults to '1')
                      number : '+{{integer(2101200000, 9801200001)}}' // UI integer (UI - dropdown populated by UI script, required field for saving valid number)
              }],
              authentication_devices: [
                '{{repeat(2)}}',
                {
                  index: '{{index()}}', // API generated (Index of current cloned object starting from 0)
                  id : '{{integer(0, 99999999)}}', // Database generated (unique integer)
                  label: '{{random("iPhone", "iPad", "Android", "Tablet")}}', // UI string (UI - dropdown with optional text input, defaults to 'Primary') 
                  lifespan: [{ // see lifespan notes above
                              id : '{{integer(0, 99999999)}}',
                              active_time : '{{date(new Date(2016, 3, 3), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
                              disable_time : '{{date(new Date(2017, 0, 1), new Date(2018, 2, 1), "YYYY-MM-ddThh:mm:ss Z")}}',
                              created : '{{date(new Date(2016, 0, 1), new Date(2016, 2, 1), "YYYY-MM-ddThh:mm:ss Z")}}',
                              is_enabled : '{{bool()}}'
                        }],
                  secret : '{{objectId()}}', // Database generated ? (string passed from authentication_device ?) @FIXME
                  APNS_token : '{{objectId()}}' // Database generated ? (string passed from authentication_device ?) @FIXME
                }
              ],
              user_facial_model :  [{
                                      id : '{{integer(0, 99999999)}}', // Database generated (unique integer)
                                      lifespan: [{ // see lifespan notes above
                                          id : '{{integer(100, 99999999)}}',
                                          active_time : '{{date(new Date(2016, 3, 3), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
                                          disable_time : '{{date(new Date(2017, 0, 1), new Date(2018, 2, 1), "YYYY-MM-ddThh:mm:ss Z")}}',
                                          created : '{{date(new Date(2016, 0, 1), new Date(2016, 2, 1), "YYYY-MM-ddThh:mm:ss Z")}}',
                                          is_enabled : '{{bool()}}'
                                      }],
                                      facial_model_id : [
                                        '{{repeat(2)}}',
                                        {
                                        index: '{{index()}}', // API generated (Index of current cloned object starting from 0)
                                        facial_model: [{
                                          id : '{{integer(0, 99999999)}}', // Database generated (unique integer)
                                          label : '{{random("primary", "secondary", "other")}}', // UI string (UI - dropdown with optional text input, Defaults to 'Primary') @FIXME
                                          uri : 'http://lorempixel.com/100/100/people', // UI string (UI - uri of the saved image location, required for a valid saved facial_model iamge, generated by the authentication_device) @FIXME
                                        }]
                                      }]
                                    }]
    }]
  }
]