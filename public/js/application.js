$(document).ready(function(){
    let email;
    $.ajax({
        url: '/api/email',
        method: 'post',
        success: function(response){
            email = response.email;
            console.log(response);
        }
    });
    $('#submit').click(function(event){
        event.preventDefault();
        $.ajax({
            url: `http://formspree.io/${email}`,
            method: 'post',
            data: $('#form').serialize(),
            dataType: 'json',
            sucess: function(response){
                console.log(response);
            }
        });
    });
});