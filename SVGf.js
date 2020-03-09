

function SVGf() {

    return {
        createSVG: function (w, h, attrs) {
            //console.log("create");
            var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            var vb = "0,0," + w + "," + h;

            svg.setAttribute("viewBox", vb);
            svg.setAttribute("width", w);
            svg.setAttribute("height", h);
            if (attrs) {
                for (var at in attrs) {
                    svg.setAttribute(at, attrs[at]);

                }
            }

            return svg;
        },

svgElAtts:function(el,attrs){
            //console.log("svg set attr");
            if(!el)return;
          for(var at in attrs)
        {
        el.setAttribute(at, attrs[at]);
        
        }
        
        },

        addLine: function (svg, x, y, x1, y1, w, co) {

            var el = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            var dw = w ? w : 1;
            var col = co ? co : randCol();
            el.setAttribute('x2', x1);
            el.setAttribute('y2', y1);
            el.setAttribute('stroke-width', dw);

            el.setAttribute('x1', x);
            el.setAttribute('y1', y);
            el.setAttribute('stroke', col);

            svg.appendChild(el);
            return el;
        },



        addDot: function (svg, x, y, col, dw,att) {


            var el = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            if (!col) col = "#aaaaaa";
            if (!dw) dw = 5; else dw = dw;

            el.setAttribute('r', dw);
            el.setAttribute('cx', x);
            el.setAttribute('cy', y);
            el.setAttribute('fill', col);
            if(att){
                for(var i in att){
                    el.setAttribute(i, att[i]);  
                }
            }
            svg.appendChild(el);


            return el;
        },
        addSvgElement: function (svg, type, attrs) {
            //	console.log("add svg",type);
            var el = document.createElementNS('http://www.w3.org/2000/svg', type);
            for (var at in attrs) {
                el.setAttribute(at, attrs[at]);

            }
            svg.appendChild(el);
            return el;
        },

        addCurveLine: function (svg, x, y, x1, y1, w, co) {

            var amp = 80;
            var el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            var col = co;
            var dw = w ? w : 1;

            var px = x + (x1 - x) / 2 + ((Math.random() * amp) - amp / 2);
            var py = y + (y1 - y) / 2 + ((Math.random() * amp) - amp / 2);

            el.setAttribute('d', "M " + x + " " + y + " Q " + px + " " + py + " " + x1 + " " + y1);
            el.setAttribute('stroke-width', dw);
            el.setAttribute("fill", "none");
            el.setAttribute('stroke', col);

            svg.appendChild(el);
            return el;





        },

        addImg: function (svg, x, y, col, dw, img) {
            var el = document.createElementNS('http://www.w3.org/2000/svg', 'image');
            if (!col) col = "#aaaaaa";

            // <image xlink:href="https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png" height="200" width="200"/>
            if (!img || img == '') img = "rune/" + parseInt(rand(33) + 1) + ".png";
            var el = this.addSvgElement(svg, "image", {
                'href': img, 'x': x - (dw / 2), 'y': y - (dw / 2),
                'width': dw, 'height': dw, "href": img
            });

            svg.appendChild(el);

        }
    }
}






    //////////////
    function loadJson(file, fn,obj) {
        if(obj==null)obj={};
        loadData(file, function (data) {
            
            fn(data);//JSON.parse(str.text()));
        }, obj);

    }

    /////////////////
    //loadData("scr.php",function(data){},{com:"string"},function(err){});
    function loadData(file, f, obj, err) {
        if (!obj) obj = {};
        $.post(file, obj)
            .done(function (data) {

                f(data);//.children("div"));

            }).error(function (data) {
                if (err) err(data); else console.log(data)
            });
    }


    function showInSecuence(els) {
        var c = 0;
        var n = els.length;
        showNext();
        function showNext() {
            els.eq(c).velocity({ opacity: 1 }, 60, function () {
                c++;
                if (c < n) showNext();
            });


        }

    }


    //////////////svg line  mod
    function getSVGLines(obj, scale) {

        //obj={w:200, h:120,x:0,y:0, lines:[[{x:100,y:100},{x:200,y:100},{x:150,y:100}]]};
        var sx = obj.sx != null ? obj.sx * scale : 0;
        var sy = obj.sy != null ? obj.sy * scale : 0;

        var str = '<svg class="label-svg" width="' + (obj.w * scale) + '" height="' + (obj.h * scale) + '" viewBox="0 0 ' + (obj.w) + ' ' + (obj.h) + '" xmlns="http://www.w3.org/2000/svg" style="position:absolute;background:none;top:' + sy + 'px;left:' + sx + 'px;">';


        for (var i = 0; i < obj.lines.length; i++) {
            str += '<path data-n="' + i + '" d="';


            str += 'M' + (obj.lines[i][0].x) + ' ' + obj.lines[i][0].y + ' ';

            for (var ii = 1; ii < obj.lines[i].length; ii++) {
                str += 'L' + obj.lines[i][ii].x + ' ' + obj.lines[i][ii].y + ' ';
            }
            str += '" fill="none" stroke="' + grayColor + '" stroke-width="1" />';

        }


        for (i = 0; i < obj.lines.length; i++) {

            str += '<circle  data-n="' + i + '"  cx="' + obj.lines[i][obj.lines[i].length - 1].x + '"  cy= "' + obj.lines[i][obj.lines[i].length - 1].y + '" r="5" stroke-width="0" fill="' + grayColor + '" />';
        }
        str += '</svg>';

        return str;
    }

 
    //////////////svg line  mod
    function getSVGLinesNEW(obj, scale) {

        //obj={w:200, h:120,x:0,y:0, lines:[[{x:100,y:100},{x:200,y:100},{x:150,y:100}]]};
        var sx = obj.sx != null ? obj.sx * scale : 0;
        var sy = obj.sy != null ? obj.sy * scale : 0;

        var svg = SVG.createSVG((obj.w * scale), (obj.h * scale), { class: "label-svg", style: "position:absolute;background:none;top:" + sy + "px;left:" + sx + "px;" });


        for (var i = 0; i < obj.lines.length; i++) {
            var str = '';
            str += 'M' + (obj.lines[i][0].x) + ' ' + obj.lines[i][0].y + ' ';

            for (var ii = 1; ii < obj.lines[i].length; ii++) {
                str += 'L' + obj.lines[i][ii].x + ' ' + obj.lines[i][ii].y + ' ';
            }


            SVG.addSvgElement(svg, "path", { "data-n": i, d: str, fill: "none", stroke: grayColor, "stroke-width": 1 });


        }


        for (i = 0; i < obj.lines.length; i++) {

            SVG.addDot(svg,
                obj.lines[i][obj.lines[i].length - 1].x,
                obj.lines[i][obj.lines[i].length - 1].y,
                grayColor, 5,
                { "data-n": i, "stroke-width": 0 }
            );
        }

        return $(svg);
    }
 





