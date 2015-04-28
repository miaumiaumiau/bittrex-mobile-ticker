function fill_template(template, vars) {
    var result = template;

    for (var key in vars) {
        var re = new RegExp('!' + key + '!', 'g');
        result = result.replace(re, vars[key]);
    }

    return result;
}