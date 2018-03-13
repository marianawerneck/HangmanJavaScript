function criaJogo(sprite) {
	var palavraSecreta = '';
	var lacunas = new Array();
	var etapa = 1;
	var certo = 0;
	var errado = 0;
	var tentativas = 0;
	var totalDeTentaivas = 8;
    function setPalavraSecreta(palavra) {
        palavraSecreta = palavra;
		setLacunas(palavraSecreta.length);
		etapa++;
    };
	function setLacunas(tamPalavra){
		for(i=0; i<tamPalavra; i++){
			lacunas.push('');
		}
	};
    function getLacunas() {
        return lacunas;    
    };

    function getEtapa() {
        return etapa;    
    };

	function processaChute(letra){
		var acertou = 0;
		for(i=0; i<palavraSecreta.length; i++){
			if(letra == palavraSecreta[i]){
				lacunas[i] = letra;
				acertou = 1;
			}
		}
		if(acertou == 0){
			tentativas++;
			sprite.nextFrame();
		}
	}
	
	function palavraCompleta(){
		if(palavraSecreta==''){
			return false;
		}
		for(i=0; i<palavraSecreta.length; i++){
			if(lacunas[i]==""){
				return false;
			}
		}
		return true;
	}
	
	function ganhouOuPerdeu(){
		if(tentativas>=totalDeTentaivas||palavraCompleta()){
			return true;
		}
		return false;
		
	}
	
	function ganhou(){
		if(tentativas<=totalDeTentaivas&&palavraCompleta()){
			return true;
		}else{
			return false;
		}
	}
		
	function perdeu(){
		if(tentativas>=totalDeTentaivas&&(!palavraCompleta())){
			return true;
		}else{
			return false;
		}
	}
	
	function reinicia(){
		palavraSecreta = '';
	    lacunas = new Array();
	    etapa = 1;
	    certo = 0;
	    errado = 0;
		tentativas = 0;
		sprite.reset();
	}
	
    return {
        setPalavraSecreta: setPalavraSecreta, 
        getLacunas: getLacunas,
        getEtapa: getEtapa,
		processaChute: processaChute,
		ganhou: ganhou,
		ganhouOuPerdeu: ganhouOuPerdeu,
		perdeu: perdeu,
		reinicia: reinicia
    };
};