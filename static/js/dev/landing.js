(function() {

    var HEX_WIDTH = 132,
        HEX_HEIGHT = 113,
        TOP_PADDING = 77,
        LEFT_PADDING = 65,
        FORWARD = 'forward',
        BACKSLASH = 'backslash',

        data = window.rounds || [],

        cols = 0,
        rows = 0,
        grid = [],

        itr = 0;

        getRandomPosition = function() {

            var x = Math.round(Math.random() * cols),
                y = Math.round(Math.random() * rows);

            while (typeof grid[y * rows + x] === 'object') {
                x = Math.round(Math.random() * cols);
                y = Math.round(Math.random() * rows);
            }

            return y * rows + x;

        },

        placeHex = function(round) {
            var index = getRandomPosition(),
                y = Math.floor(index / cols),
                x = index - (y * cols),
                direction = Math.random() > 0.5 ? BACKSLASH : FORWARD,
                xOffset = direction === FORWARD ? -(HEX_WIDTH / 2) : 0;

            xOffset += y % 2 > 0 ? HEX_WIDTH / 2 : 0;

            grid[(y + 1) * cols + (y % 2 > 0 ? -1 : 0) + x] = {};
            grid[index] = {
                character1: round.character1,
                character2: round.character2,
                x: x * HEX_WIDTH + LEFT_PADDING + xOffset,
                y: y * HEX_HEIGHT + TOP_PADDING,
                direction: direction,
                fadeDelay: itr++
            };

            return Templates['views/hexRound'](grid[index]);

        },

        init = function() {
            var $window = $(window),
                out = '';

            cols = Math.floor(($window.width() - LEFT_PADDING) / HEX_WIDTH);
            rows = Math.floor(($window.height() - TOP_PADDING) / HEX_HEIGHT);
            grid = new Array(cols * rows);

            data.forEach(function(item) {
                out += placeHex(item);
            });

            $('#hexes').html(out);

        };

    if ($('#page-landing').length && data.length) {
        $(init);
    }

}());