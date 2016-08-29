/**
 * Created by Oscar Larriega on 29/08/16.
 * <larriega@gmail.com>
 */

(function() {
    var $portfolio = $('#portafolio');
    if ($portfolio.length) {
        $('ul.nav-justified a').first().addClass('product-active');
    }
})()