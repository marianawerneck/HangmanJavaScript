function criaController(jogo){
	var $entrada = $('#entrada');
	var $lacunas = $('.lacunas');
	
	// consulta jogo.getLacunas() e exibe para o usuário cada lacuna 

   function exibeLacunas(){
        $lacunas.empty();
        jogo.getLacunas().forEach(function (lacuna) {
            $('<li>')
                .addClass('lacuna')
                .text(lacuna)
                .appendTo($lacunas);
        });
    };

    // muda o texto do placeHolder do campo de entrada    
    function mudaPlaceHolder(texto) {
		$("#entrada").val("")
		$entrada.attr("placeholder",texto);
    };

    // passa para jogo.setPalavraSecreta() o valor digitado pelo jogador e chama o a função `exibeLacunas()` e `mudaPlaceHolder()` definidas no controller. 

    function guardaPalavraSecreta() {
		var palavra = $('#entrada').val();
		jogo.setPalavraSecreta(palavra);
        mudaPlaceHolder("Pick a letter");
		exibeLacunas();
		
    };
	var repetido;
	
	function chute(){
		repetido = 0;
		var letra = $entrada.val();
		verificaEstaEmLacuna(letra);
		if(repetido == 1){
			mudaPlaceHolder("This letter was already found out");
		}else{
		jogo.processaChute(letra);
		mudaPlaceHolder("Pick a letter");
		exibeLacunas();
		verificaFimDeJogo();
		}
	}
	
	function verificaEstaEmLacuna(letra){
		repetido = 0;
		jogo.getLacunas().forEach(function(lacuna){
			if(letra==lacuna){
				repetido = 1;
				
			}
		});
	}
	
	function verificaFimDeJogo(){
		if(jogo.ganhouOuPerdeu()){
			fimDeJogo();
		}
	}
	
	function fimDeJogo(){
		if(jogo.ganhou()){
			mudaPlaceHolder("You won!");
		}else{
			mudaPlaceHolder("You lost...");
		}
		$entrada.prop("disabled",true);
		$("#botaoReiniciar").css("display","block");
		$("#botaoReiniciar").click(function(){
			
			refresh();
		});
	}
	
	function refresh(){
		jogo.reinicia();
		$entrada.prop("disabled",false);
		mudaPlaceHolder("Choose the secret word");
		$lacunas.empty();
		$("#botaoReiniciar").css("display","none");
		
	}

    // faz a associação do evento keypress para capturar a entrada do usuário toda vez que ele teclar ENTER
    function inicia() {
		$entrada.keypress(function (event) {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
						
                        return guardaPalavraSecreta();
						
                        
                    case 2:
						
                        return chute();
                       
                }
            }
		}
    )};

    // retorna um objeto com a propriedade inicia, que deve ser chamada assim que o controller for criado. 
    return { 
		inicia: inicia 
	};
};

