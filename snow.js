/**
 * @author : Vu Nhat Anh <anhvnse@gmail.com>
 * @from: nhatanhnotes.com
 */
var numberOfSnows = 60;
var snowChar = "*";
var snowflakes = [];
var fps = 60;
var speedFactor = 3.8 / fps;
var windFactor = 1.8 / fps;

function startSnow() {
    for (var i = 0; i < numberOfSnows; i++) {
        snowflakes[i] = new SnowObject(i, snowChar);
        snowflakes[i].move();
    }
}

function SnowObject(id, image) {
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var sizeMAX = 30; // Config Max size of a snowflake
    var sizeMIN = 10; // Config Min size of a snowflake
    var _this = this;
    /* Create Document Object */
    document.write("<span id='snow" + id + "' style='position: absolute; top: 0px; left: 0px;'>" + image + "</span>");
    document.write("<span id='dead" + id + "' style='position: absolute; top: 0px; left: 0px; display: none;'>" + image + "</span>");
    /* Construct */
    _this.size = Math.floor(Math.random() * (sizeMAX - sizeMIN) + sizeMIN);
    _this.x = Math.floor(Math.random() * (screenWidth - sizeMAX) + sizeMAX);
    _this.y = Math.floor(Math.random() * (screenHeight - sizeMAX));
    _this.speed = _this.size * speedFactor + Math.abs(windFactor * speedFactor / 3);
    _this.noisy = _this.size * speedFactor + Math.abs(windFactor * speedFactor / 3);
    _this.object = document.getElementById("snow" + id);
    _this.setAttribute = function setAttribute() {
        _this.object.setAttribute("style", "position: absolute; left:" + _this.x + "px; top:" + _this.y + "px; font-size:" + _this.size + "px;");
    }
    _this.setAttribute();
    /* Set random initial coordiates the snowObject */
    _this.init = function init() {
        _this.x = Math.floor(Math.random() * (screenWidth - sizeMAX) + sizeMAX);
        _this.y = sizeMAX;
        if (_this.x % 2 == 0) {
            if (windFactor > 0) _this.x = sizeMAX;
            else if (windFactor < 0) _this.x = screenWidth - sizeMAX;
            _this.y = Math.floor(Math.random() * (screenHeight - sizeMAX) + sizeMAX);
        }
        _this.setAttribute();
    }
    /* Make snowObject move */
    _this.move = function move() {
        _this.screenWidth = window.innerWidth;
        _this.screenHeight = window.innerHeight;
        _this.y = _this.y + _this.speed - Math.floor(Math.random() * Math.abs(windFactor * 0.1));
        _this.x = _this.x + Math.floor(Math.random() * _this.noisy + windFactor * 0.1);
        if (_this.x < sizeMAX || _this.x > screenWidth - sizeMAX || _this.y > screenHeight - sizeMAX) {
            if (_this.y > screenHeight - sizeMAX) document.getElementById("dead" + id).setAttribute("style", "position:absolute; left:" + _this.x + "px; top:" + _this.y + "px; font-size:" + _this.size + "px;");
            _this.init();
        } else _this.setAttribute();
        if (Math.random() < 0.0001) {
            windFactor = (Math.floor(Math.random() * 10) % 2 == 0 ? 1 : -1) * Math.floor(Math.random() * 11)
        };
        setTimeout(function() {
            _this.move()
        }, 1000/fps);
    }
}
