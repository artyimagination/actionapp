import validate from 'validate.js';

const constraints = {
  name: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be atleast 6 character'
    }
  },
  email: {
    presence: true,
    email: {
      message: 'Please enter a valid email address'
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 characters'
    }
  },
  confirmPassword: {
    equality: 'password'
  },
  mobile: {
    presence: true,
    length: {
      minimum: 10,
      message: 'Enter Valid Phone Number'
    }
  },
  category: {
    presence: true
  },
  language: {
    presence: true
  },
  gender: {
    presence: true
  },
  address: {
    presence: true,
    length: {
      minimum: 5,
      maximum: 25,
      message: 'Enter Valid address'
    }
  },
  selectedstate: {
    presence: true
  },
  city: {
    presence: true
  },
  experience: {
    presence: true,
    length: {
      minimum: 1,
      maximum: 2,
      message: 'Please Enter Valid Experience'
    }
  },
  height: {
    presence: true
  },
  weight: {
    presence: true
  },
  waist: {
    presence: true
  }
};

const Validator = (field, value) => {
  // Creates an object based on the field name and field value
  // e.g. let object = {email: 'email@example.com'}
  const object = {};
  object[field] = value;

  const constraint = constraints[field];
  //console.log(object, constraint);

  // Validate against the constraint and hold the error messages
  const result = validate(object, { [field]: constraint });
  //console.log(object, constraint, result);

  // If there is an error message, return it!
  if (result) {
    // Return only the field error message if there are multiple
    return result[field][0];
  }

  return null;
};

const PasswordValidator = (object) => {
  console.log(object);
  const result = validate(object, constraints);
  // If there is an error message, return it!
  //console.log('result : ', result);
  if (result.confirmPassword) {
    // Return only the field error message if there are multiple
    return result.confirmPassword[0];
  }
  return null;
};

export { Validator, PasswordValidator };
