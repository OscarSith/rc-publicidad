/**
 * Created by Oscar Larriega on 29/08/16.
 * <larriega@gmail.com>
 */

(function() {
    var $portfolio = $('#portafolio'), $services = $('#services');
    if ($portfolio.length) {
        $('ul.nav-justified li').first().addClass('active');
    }

    if ($services.length) {
        var classOption = 'service-option';
        var $ul = $services.find('.left-content-services ul');

        $ul.on('mouseover mouseleave', 'li', changeIcon);
        $ul.on('click', 'a', changeService);
        $ul.find('a').first().addClass(classOption).parent().trigger('mouseover');
        $('#serv_1').addClass('active');

        function changeIcon(e) {
            var $this = $(e.currentTarget),
                $icon = $this.children().first().children();

            if (!$icon.parent().hasClass(classOption) || $icon.hasClass('fa-plus')) {
                if (e.type === 'mouseover') {
                    $icon.removeClass('fa-plus').addClass('fa-minus');
                } else if (e.type === 'mouseleave') {
                    $icon.removeClass('fa-minus').addClass('fa-plus');
                } else {
                    console.error('Service: Undefined event');
                }
            }
        }

        function changeService(e) {
            e.preventDefault();

            var $this = $(e.currentTarget);
            $this.closest('ul').find('a.' + classOption).removeClass(classOption).parent().trigger('mouseleave');
            $this.addClass(classOption);
        }
    }

    // Forms
    var $formMail = $('#send-form');

    if ($formMail.length) {
        $formMail.on('submit', sendFormBanner);


        function sendFormBanner(e) {
            e.preventDefault();
            var $form = $(this),
                $inputs = $form.find(':input'),
                data = $form.serialize();

            $inputs.prop('disabled', true);
            $.ajax({
                url: 'http://localhost/otros/rc-publicidad/_site/mailer/send.php',
                type: 'post',
                dataType: 'json',
                data: data
            }).done(function (data) {
                $('#error').addClass('hidden').empty();
                $('#success').removeClass('hidden').text(data.success_message);
            }).fail(function (data, err) {
                $('#error').removeClass('hidden').text(data.responseJSON.error_message);
                $('#success').addClass('hidden').empty();
            }).always(function () {
                $inputs.prop('disabled', false);
                $form.trigger('reset');
            });
        }
    }
})()