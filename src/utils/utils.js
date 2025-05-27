const validator = {

    validateUserRegistration(full_name, age, email, password) {
        if(!full_name || !age || !email || !password)
            return false;
        return true;
    },

    validateAdminLogin(id_admin, admin_pass) {
        if(!id_admin || !admin_pass)
            return false;
        return true;
    },

    validateUserLogin(email, password) {
        if(!email || !password)
            return false;
        return true;
    },
    
    validateBook(id_book, author, pages) {
        if(!id_book || !author || !pages)
            return false;
        return true;
    },
    
    validateReview(id_user, id_book, review, stars) {
        if(!id_user || !id_book || !review || !stars)
            return false;
        return true;
    }
}

module.exports = validator;


