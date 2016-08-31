/**
 * Created by Oscar Larriega on 29/08/16.
 * <larriega@gmail.com>
 */

(function() {
    var $portfolio = $('#portafolio'), $services = $('#services');
    if ($portfolio.length) {
        $('ul.nav-justified a').first().addClass('product-active');
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
})()