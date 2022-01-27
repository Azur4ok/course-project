const REQUIRED_FIELD = "necessarily";

export const loginValidation = {
    required: REQUIRED_FIELD,
    validate: (value) => {
        if(value.match(/[а-яА-Я]/))
            return "input field only latin letters"

        return true;
    }

}

export const passwordValidation = {
    required: REQUIRED_FIELD,
    validate: (value) => {
        if(value.match(/[а-яА-Я]/))
            return "input field only latin letters"

        return true;
    }

}