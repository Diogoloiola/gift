const overlay = {
    showOverlayForm(msg) {
        $('#formulario').fadeOut(500);
        this.showOverlay(msg);
        $('.closebtn').css("display", "none");
    },
    showOverlay(msg) {
        $('#overlay').show();
        $('#text').html(msg);
    },
    hideFormOverlay() {
        $('#overlay').hide();
        $('#tabela').show();
    },
    hideOverlay() {
        $('#overlay').hide();
    },
    btnClose() {
        $('.closebtn').css("display", "block")
    }
}

export { overlay };