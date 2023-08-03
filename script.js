//Click Function
function Pixel(px, dmg) {
    if (dmg == null) {
        dmg = parseInt($("#Dano").text());
    }

    var ActualHealth = parseInt($(px).text());
    var Health = ActualHealth - dmg;

    if (Health <= 0) {
        $(px).addClass('Ticado');
        $(px).removeClass('Pixel');
        $(px).off('click');
        $(px).text("");

        $("#Pixeles").text(parseInt($("#Pixeles").text()) + 1)

        $('.Cuadrado').attr('property', parseInt($('.Cuadrado').attr('property')) - 1)

        if ($('.Cuadrado').attr('property') == "0") {
            $('.Ticado').addClass('Pixel');
            $('.Ticado').removeClass('Ticado');
            $('.Cuadrado').attr('property', 289);
            $('.Pixel').on('click', function (e) {
                Pixel(this)
            });

            $(".Cuadrado").attr("title", parseInt($(".Cuadrado").attr("title")) + 1)

            $("#Nivel").text($(".Cuadrado").attr("title"));
            $('.Pixel').text($(".Cuadrado").attr("title"));

            Guardado()
        }
    } else {
        $(px).text(Health);
    }
}



//Click
function ActiveDmg() {
    if (parseInt($("#Pixeles").text()) >= parseInt($("#Dano_Cost").text())) {
        DescontarPixeles(parseInt($("#Dano_Cost").text()));
        $("#Dano").text(parseInt($("#Dano").text()) + 1)
        ActualizarPrecio("Dano_Cost");
    }
}
function ActiveMultiClick() {
    if (parseInt($("#Pixeles").text()) >= parseInt($("#ExtraHits_Cost").text())) {
        DescontarPixeles(parseInt($("#ExtraHits_Cost").text()));
        $("#ExtraHits").text(parseInt($("#ExtraHits").text()) + 1)
        ActualizarPrecio("ExtraHits_Cost");
    }
}



//Hitters
function IdleHitters() {
    if (parseInt($("#Pixeles").text()) >= parseInt($("#IdleHitters_Cost").text())) {
        DescontarPixeles(parseInt($("#IdleHitters_Cost").text()));
        $("#IdleHitters").text(parseInt($("#IdleHitters").text()) + 1)
        ActualizarPrecio("IdleHitters_Cost");
    }
}
function IdleHittersDmg() {
    if (parseInt($("#Pixeles").text()) >= parseInt($("#IdleDmg_Cost").text())) {
        DescontarPixeles(parseInt($("#IdleDmg_Cost").text()));
        $("#IdleDmg").text(parseInt($("#IdleDmg").text()) + 1)
        ActualizarPrecio("IdleDmg_Cost");
    }
}
function IdleHittersCrit() {
    if (parseInt($("#Pixeles").text()) >= parseInt($("#IdleCritHit_Cost").text())) {
        DescontarPixeles(parseInt($("#IdleCritHit_Cost").text()));
        $("#IdleCritHit").text(parseInt($("#IdleCritHit").text()) + 1)
        ActualizarPrecio("IdleCritHit_Cost");
    }
}

//Funcionalidades

function DescontarPixeles(value) {
    $("#Pixeles").text(parseInt($("#Pixeles").text()) - value)
}

function ActualizarPrecio(id) {
    $("#" + id).text(Math.round(parseInt($("#" + id).text()) * 1.12));
}

function ModificarInterval(ms) {
    clearInterval(Interval);
    var Interval = setInterval(function () {
        var IdleHitters = parseInt($("#IdleHitters").text());
        for (var i = 0; i < IdleHitters; i += 1) {
            var randomIndex = Math.floor(Math.random() * $('.Pixel').length);
            var dmg = parseInt($("#IdleDmg").text());

            var Perc = $("#IdleCritHit").text();
            //cambiar esto a Perc/100
            if (Perc.length == 1) {
                Perc = "0.0" + Perc
            } else if (Perc.length == 2) {
                Perc = "0." + Perc
            } else if (Perc.length == 3) {
                Perc = Perc
            }

            if (Math.random() < Perc) {
                dmg = dmg * 2;
            }

            Pixel($('.Pixel')[randomIndex], dmg);
        }
    }, ms);
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=" + window.location.hostname;
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function Guardado() {
    var Pixeles = $("#Pixeles").text();
    setCookie("Pixeles", Pixeles, 365);
    var Cuadrado_Title = $(".Cuadrado").attr("title");
    setCookie("Cuadrado_Title", Cuadrado_Title, 365);

    var Dano = $("#Dano").text();
    setCookie("Dano", Dano, 365);
    var Dano_Cost = $("#Dano_Cost").text();
    setCookie("Dano_Cost", Dano_Cost, 365);

    var IdleHitters = $("#IdleHitters").text();
    setCookie("IdleHitters", IdleHitters, 365);
    var IdleHitters_Cost = $("#IdleHitters_Cost").text();
    setCookie("IdleHitters_Cost", IdleHitters_Cost, 365);

    var IdleDmg = $("#IdleDmg").text();
    setCookie("IdleDmg", IdleDmg, 365);
    var IdleDmg_Cost = $("#IdleDmg_Cost").text();
    setCookie("IdleDmg_Cost", IdleDmg_Cost, 365);

    var IdleCritHit = $("#IdleCritHit").text();
    setCookie("IdleCritHit", IdleCritHit, 365);
    var IdleCritHit_Cost = $("#IdleCritHit_Cost").text();
    setCookie("IdleCritHit_Cost", IdleCritHit_Cost, 365);

    console.log("Guardado Automatico");
}

function RecuperarGuardado() {

    $("#Pixeles").text(getCookie("Pixeles"));
    $("#Nivel").text(getCookie("Cuadrado_Title"));
    $(".Cuadrado").attr("title", getCookie("Cuadrado_Title"));

    $("#Dano").text(getCookie("Dano"));
    $("#Dano_Cost").text(getCookie("Dano_Cost"));

    $("#IdleHitters").text(getCookie("IdleHitters"));
    $("#IdleHitters_Cost").text(getCookie("IdleHitters_Cost"));

    $("#IdleDmg").text(getCookie("IdleDmg"));
    $("#IdleDmg_Cost").text(getCookie("IdleDmg_Cost"));

    $("#IdleCritHit").text(getCookie("IdleCritHit"));
    $("#IdleCritHit_Cost").text(getCookie("IdleCritHit_Cost"));
}

function HardReset() {
    if(confirm("Esta seguro de eliminar todo?")){
        document.cookie='';
        location.reload();
    }
}