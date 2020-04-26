const overlay = {
    showOverlayForm(msg){
        $('#formulario').fadeOut(500);
        this.showOverlay(msg);
    },
    showOverlay(msg){
        $('#overlay').show();
        $('#text').html(msg);
    },
    hideFormOverlay(){
        $('#overlay').hide();
        $('#tabela').show();
    },
    hideOverlay(){
        $('#overlay').hide();
    }
}

export {overlay};