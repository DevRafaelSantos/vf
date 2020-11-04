// var caminho = "https://evoestagios.com.br/sistema/";
var caminho = "http://localhost/vf/administrativo-agenda/";

var cep = document.querySelector('#cep').value;

// Máscara do CEP do formulário
document.getElementById("cep").addEventListener("input", function () {
    var i = document.getElementById("cep").value.length;
    var str = document.getElementById("cep").value
    if (isNaN(Number(str.charAt(i - 1)))) {
        document.getElementById("cep").value = str.substr(0, i - 1)
    }
});

document.addEventListener('keydown', function (event) {
    if (event.keyCode != 46 && event.keyCode != 8) {
        var i = document.getElementById("cep").value.length;
        if (i === 5)
            document.getElementById("cep").value = document.getElementById("cep").value + "-";
    }
});

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('endereco').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('estado').value = ("");

}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('endereco').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('estado').value = (conteudo.uf);

    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('endereco').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('estado').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};

var nome = document.getElementById("nome");
var categoria = document.getElementById("categoria");
var local = document.getElementById("local");

var alerta_nome = document.getElementById("alerta_nome");
var alerta_categoria = document.getElementById("alerta_categoaria");
var alerta_local = document.getElementById("alerta_local");

function criar_novos_campos() {


    var local = document.getElementById("local");
    var corpo_recipiente = document.getElementById("corpo_recipiente");
    var recipiente = document.getElementById("recipiente");

    // ele serve para criar o recipiente caso o mesmo tenho já sido excluido anteriormente
    if (recipiente == null) {
        // criando select ano em curso no documento
        var recipiente = document.createElement("div");
        recipiente.id = "recipiente";
        corpo_recipiente.appendChild(recipiente);
    }

    if (local.value == "Físico") {
        // console.log("Agenda Físico");

        //tratando troca de conteúdos para não somar conteúdos
        if ((document.getElementById("endereco"))) {
            corpo_recipiente.removeChild(recipiente);
            var recipiente = document.createElement("div");
            recipiente.id = "recipiente";
            corpo_recipiente.appendChild(recipiente);
        }


        /* LOCALIDADE */
        // CRIANDO ALERTA SPAN ///////////////////////////////////////////////////////////
        let alerta_localidade = document.createElement("span");
        alerta_localidade.id = "alerta_localidade";
        alerta_localidade.name = "alerta_localidade";
        alerta_localidade.className = "alerta_formulario";

        // criando input 
        var localidade = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        localidade.setAttribute("type", "text");

        // criando nome para o input 
        localidade.name = "localidade";

        // criando id para o input 
        localidade.id = "localidade";

        // travando tamanho do input
        localidade.maxLength = 150;

        // criando div para receber o input e label
        var div_localidade = document.createElement("div");

        // criando label 
        var label_localidade = document.createElement("label");

        // inserindo conteúdo no label
        label_localidade.textContent = "Localidade *";

        // atribuindo classe para a div
        div_localidade.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_localidade);

        // inserindo label  dentro da div
        div_localidade.appendChild(label_localidade);

        // inserindo input dentro da div 
        div_localidade.appendChild(localidade);

        // inserindo alerta na div
        div_localidade.appendChild(alerta_localidade);

        /* CEP */

        let alerta_cep = document.createElement("span");
        alerta_cep.id = "alerta_cep";
        alerta_cep.name = "alerta_cep";
        alerta_cep.className = "alerta_formulario";

        // criando input 
        var cep = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        cep.setAttribute("type", "text");

        // criando nome para o input 
        cep.name = "cep";

        // criando id para o input 
        cep.id = "cep";

        cep.value = "";
        // input.addEventListener('keydown', logKey);
        cep.onblur = function () { pesquisacep(this.value) };

        // travando tamanho do input
        cep.maxLength = 11;

        // criando div para receber o input e label
        var div_cep = document.createElement("div");

        // criando label 
        var label_cep = document.createElement("label");

        // inserindo conteúdo no label
        label_cep.textContent = "CEP *";

        // atribuindo classe para a div
        div_cep.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_cep);

        // inserindo label  dentro da div
        div_cep.appendChild(label_cep);

        // inserindo input dentro da div 
        div_cep.appendChild(cep);

        // inserindo alerta na div
        div_cep.appendChild(alerta_cep);

        /* Endereço */

        let alerta_endereco = document.createElement("span");
        alerta_endereco.id = "alerta_endereco";
        alerta_endereco.name = "alerta_endereco";
        alerta_endereco.className = "alerta_formulario";

        // criando input 
        var endereco = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        endereco.setAttribute("type", "text");

        // criando nome para o input 
        endereco.name = "endereco";

        // criando id para o input 
        endereco.id = "endereco";

        // travando tamanho do input
        endereco.maxLength = 200;

        // criando div para receber o input e label
        var div_endereco = document.createElement("div");

        // criando label 
        var label_endereco = document.createElement("label");

        // inserindo conteúdo no label
        label_endereco.textContent = "Endereço *";

        // atribuindo classe para a div
        div_endereco.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_endereco);

        // inserindo label  dentro da div
        div_endereco.appendChild(label_endereco);

        // inserindo input dentro da div 
        div_endereco.appendChild(endereco);

        // inserindo alerta na div
        div_endereco.appendChild(alerta_endereco);

        /* Numero */

        let alerta_numero = document.createElement("span");
        alerta_numero.id = "alerta_numero";
        alerta_numero.name = "alerta_numero";
        alerta_numero.className = "alerta_formulario";

        // criando input 
        var numero = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        numero.setAttribute("type", "text");

        // criando nome para o input 
        numero.name = "numero";

        // criando id para o input 
        numero.id = "numero";

        // travando tamanho do input
        numero.maxLength = 10;

        // criando div para receber o input e label
        var div_numero = document.createElement("div");

        // criando label 
        var label_numero = document.createElement("label");

        // inserindo conteúdo no label
        label_numero.textContent = "Número *";

        // atribuindo classe para a div
        div_numero.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_numero);

        // inserindo label  dentro da div
        div_numero.appendChild(label_numero);

        // inserindo input dentro da div 
        div_numero.appendChild(numero);

        // inserindo alerta na div
        div_numero.appendChild(alerta_numero);

        /* Bairro */

        let alerta_bairro = document.createElement("span");
        alerta_bairro.id = "alerta_bairro";
        alerta_bairro.name = "alerta_bairro";
        alerta_bairro.className = "alerta_formulario";

        // criando input 
        var bairro = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        bairro.setAttribute("type", "text");

        // criando nome para o input 
        bairro.name = "bairro";

        // criando id para o input 
        bairro.id = "bairro";

        // travando tamanho do input
        bairro.maxLength = 100;

        // criando div para receber o input e label
        var div_bairro = document.createElement("div");

        // criando label 
        var label_bairro = document.createElement("label");

        // inserindo conteúdo no label
        label_bairro.textContent = "Bairro *";

        // atribuindo classe para a div
        div_bairro.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_bairro);

        // inserindo label  dentro da div
        div_bairro.appendChild(label_bairro);

        // inserindo input dentro da div 
        div_bairro.appendChild(bairro);

        // inserindo alerta na div
        div_bairro.appendChild(alerta_bairro);

        /* Cidade */

        let alerta_cidade = document.createElement("span");
        alerta_cidade.id = "alerta_cidade";
        alerta_cidade.name = "alerta_cidade";
        alerta_cidade.className = "alerta_formulario";

        // criando input 
        var cidade = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        cidade.setAttribute("type", "text");

        // criando nome para o input 
        cidade.name = "cidade";

        // criando id para o input 
        cidade.id = "cidade";

        // travando tamanho do input
        cidade.maxLength = 100;

        // criando div para receber o input e label
        var div_cidade = document.createElement("div");

        // criando label 
        var label_cidade = document.createElement("label");

        // inserindo conteúdo no label
        label_cidade.textContent = "Cidade *";

        // atribuindo classe para a div
        div_cidade.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_cidade);

        // inserindo label  dentro da div
        div_cidade.appendChild(label_cidade);

        // inserindo input dentro da div 
        div_cidade.appendChild(cidade);

        // inserindo alerta na div
        div_cidade.appendChild(alerta_cidade);

        /* Estado */

        let alerta_estado = document.createElement("span");
        alerta_estado.id = "alerta_estado";
        alerta_estado.name = "alerta_estado";
        alerta_estado.className = "alerta_formulario";

        // criando input 
        var estado = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        estado.setAttribute("type", "text");

        // criando nome para o input 
        estado.name = "estado";

        // criando id para o input 
        estado.id = "estado";

        // travando tamanho do input
        estado.maxLength = 100;

        // criando div para receber o input e label
        var div_estado = document.createElement("div");

        // criando label 
        var label_estado = document.createElement("label");

        // inserindo conteúdo no label
        label_estado.textContent = "Estado *";

        // atribuindo classe para a div
        div_estado.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_estado);

        // inserindo label  dentro da div
        div_estado.appendChild(label_estado);

        // inserindo input dentro da div 
        div_estado.appendChild(estado);

        // inserindo alerta na div
        div_estado.appendChild(alerta_estado);

        /* Complemento */

        let alerta_complemento = document.createElement("span");
        alerta_complemento.id = "alerta_complemento";
        alerta_complemento.name = "alerta_complemento";
        alerta_complemento.className = "alerta_formulario";

        // criando input 
        var complemento = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        complemento.setAttribute("type", "text");

        // criando nome para o input 
        complemento.name = "complemento";

        // criando id para o input 
        complemento.id = "complemento";

        // travando tamanho do input
        complemento.maxLength = 100;

        // criando div para receber o input e label
        var div_complemento = document.createElement("div");

        // criando label 
        var label_complemento = document.createElement("label");

        // inserindo conteúdo no label
        label_complemento.textContent = "Complemento";

        // atribuindo classe para a div
        div_complemento.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_complemento);

        // inserindo label  dentro da div
        div_complemento.appendChild(label_complemento);

        // inserindo input dentro da div 
        div_complemento.appendChild(complemento);

        // inserindo alerta na div
        div_complemento.appendChild(alerta_complemento);


        /* Google Maps */

        let alerta_google_maps = document.createElement("span");
        alerta_google_maps.id = "alerta_google_maps";
        alerta_google_maps.name = "alerta_google_maps";
        alerta_google_maps.className = "alerta_formulario";

        // criando input 
        var google_maps = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        google_maps.setAttribute("type", "text");

        // criando nome para o input 
        google_maps.name = "google_maps";

        // criando id para o input 
        google_maps.id = "google_maps";

        // travando tamanho do input
        google_maps.maxLength = 300;

        // criando div para receber o input e label
        var div_google_maps = document.createElement("div");

        // criando label 
        var label_google_maps = document.createElement("label");

        // inserindo conteúdo no label
        label_google_maps.textContent = "Google Maps *";

        // atribuindo classe para a div
        div_google_maps.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_google_maps);

        // inserindo label  dentro da div
        div_google_maps.appendChild(label_google_maps);

        // inserindo input dentro da div 
        div_google_maps.appendChild(google_maps);

        // inserindo alerta na div
        div_google_maps.appendChild(alerta_google_maps);

        /* Data */

        let alerta_data = document.createElement("span");
        alerta_data.id = "alerta_data";
        alerta_data.name = "alerta_data";
        alerta_data.className = "alerta_formulario";

        // criando input 
        var data = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        data.setAttribute("type", "date");

        // criando nome para o input 
        data.name = "data";

        // criando id para o input 
        data.id = "data";

        // criando div para receber o input e label
        var div_data = document.createElement("div");

        // criando label 
        var label_data = document.createElement("label");

        // inserindo conteúdo no label
        label_data.textContent = "Data *";

        // atribuindo classe para a div
        div_data.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_data);

        // inserindo label  dentro da div
        div_data.appendChild(label_data);

        // inserindo input dentro da div 
        div_data.appendChild(data);

        // inserindo alerta na div
        div_data.appendChild(alerta_data);

        /* Horário */

        let alerta_horario = document.createElement("span");
        alerta_horario.id = "alerta_horario";
        alerta_horario.name = "alerta_horario";
        alerta_horario.className = "alerta_formulario";

        // criando input 
        var horario = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        horario.setAttribute("type", "time");

        // criando nome para o input 
        horario.name = "horario";

        // criando id para o input 
        horario.id = "horario";

        // criando div para receber o input e label
        var div_horario = document.createElement("div");

        // criando label 
        var label_horario = document.createElement("label");

        // inserindo conteúdo no label
        label_horario.textContent = "Horário *";

        // atribuindo classe para a div
        div_horario.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_horario);

        // inserindo label  dentro da div
        div_horario.appendChild(label_horario);

        // inserindo input dentro da div 
        div_horario.appendChild(horario);

        // inserindo alerta na div
        div_horario.appendChild(alerta_horario);


        /* Imagem Principal*/

        let alerta_imagem = document.createElement("span");
        alerta_imagem.id = "alerta_imagem";
        alerta_imagem.name = "alerta_imagem";
        alerta_imagem.className = "alerta_formulario";

        // criando input 
        var imagem = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        imagem.setAttribute("type", "file");

        // criando nome para o input 
        imagem.name = "imagem";

        // criando id para o input 
        imagem.id = "foto_logo";

        // criando div para receber o input e label
        var div_imagem = document.createElement("div");

        // criando label 
        var label_imagem = document.createElement("label");

        // inserindo conteúdo no label
        label_imagem.textContent = "Imagem *";

        // atribuindo classe para a div
        div_imagem.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_imagem);

        // inserindo label  dentro da div
        div_imagem.appendChild(label_imagem);

        // inserindo input dentro da div 
        div_imagem.appendChild(imagem);

        // inserindo alerta na div
        div_imagem.appendChild(alerta_imagem);

        /* Imagem Secundária */

        let alerta_imagem_secundaria = document.createElement("span");
        alerta_imagem_secundaria.id = "alerta_imagem_secundaria";
        alerta_imagem_secundaria.name = "alerta_imagem_secundaria";
        alerta_imagem_secundaria.className = "alerta_formulario";

        // criando input 
        var imagem_secundaria = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        imagem_secundaria.setAttribute("type", "file");

        // criando nome para o input 
        imagem_secundaria.name = "imagem_secundaria";

        // criando id para o input 
        imagem_secundaria.id = "foto_logo_secundaria";

        // criando div para receber o input e label
        var div_imagem_secundaria = document.createElement("div");

        // criando label 
        var label_imagem_secundaria = document.createElement("label");

        // inserindo conteúdo no label
        label_imagem_secundaria.textContent = "Imagem Secudária*";

        // atribuindo classe para a div
        div_imagem_secundaria.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_imagem_secundaria);

        // inserindo label  dentro da div
        div_imagem_secundaria.appendChild(label_imagem_secundaria);

        // inserindo input dentro da div 
        div_imagem_secundaria.appendChild(imagem_secundaria);

        // inserindo alerta na div
        div_imagem_secundaria.appendChild(alerta_imagem_secundaria);


    } else if (local.value == "Online") {
        //console.log("Agenda Online");

        //tratando troca de conteúdos para não somar conteúdos
        if ((document.getElementById("localidade"))) {
            corpo_recipiente.removeChild(recipiente);
            var recipiente = document.createElement("div");
            recipiente.id = "recipiente";
            corpo_recipiente.appendChild(recipiente);
        }

        /* Endereço */

        let alerta_endereco = document.createElement("span");
        alerta_endereco.id = "alerta_endereco";
        alerta_endereco.name = "alerta_endereco";
        alerta_endereco.className = "alerta_formulario";

        // criando input 
        var endereco = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        endereco.setAttribute("type", "text");

        // criando nome para o input 
        endereco.name = "endereco";

        // criando id para o input 
        endereco.id = "endereco";

        // travando tamanho do input
        endereco.maxLength = 200;

        // criando div para receber o input e label
        var div_endereco = document.createElement("div");

        // criando label 
        var label_endereco = document.createElement("label");

        // inserindo conteúdo no label
        label_endereco.textContent = "Endereço do Link *";

        // atribuindo classe para a div
        div_endereco.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_endereco);

        // inserindo label  dentro da div
        div_endereco.appendChild(label_endereco);

        // inserindo input dentro da div 
        div_endereco.appendChild(endereco);

        // inserindo alerta na div
        div_endereco.appendChild(alerta_endereco);

        /* Data */

        let alerta_data = document.createElement("span");
        alerta_data.id = "alerta_data";
        alerta_data.name = "alerta_data";
        alerta_data.className = "alerta_formulario";

        // criando input 
        var data = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        data.setAttribute("type", "date");

        // criando nome para o input 
        data.name = "data";

        // criando id para o input 
        data.id = "data";

        // criando div para receber o input e label
        var div_data = document.createElement("div");

        // criando label 
        var label_data = document.createElement("label");

        // inserindo conteúdo no label
        label_data.textContent = "Data *";

        // atribuindo classe para a div
        div_data.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_data);

        // inserindo label  dentro da div
        div_data.appendChild(label_data);

        // inserindo input dentro da div 
        div_data.appendChild(data);

        // inserindo alerta na div
        div_data.appendChild(alerta_data);

        /* Horário */

        let alerta_horario = document.createElement("span");
        alerta_horario.id = "alerta_horario";
        alerta_horario.name = "alerta_horario";
        alerta_horario.className = "alerta_formulario";

        // criando input 
        var horario = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        horario.setAttribute("type", "time");

        // criando nome para o input 
        horario.name = "horario";

        // criando id para o input 
        horario.id = "horario";

        // criando div para receber o input e label
        var div_horario = document.createElement("div");

        // criando label 
        var label_horario = document.createElement("label");

        // inserindo conteúdo no label
        label_horario.textContent = "Horário *";

        // atribuindo classe para a div
        div_horario.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_horario);

        // inserindo label  dentro da div
        div_horario.appendChild(label_horario);

        // inserindo input dentro da div 
        div_horario.appendChild(horario);

        // inserindo alerta na div
        div_horario.appendChild(alerta_horario);


        /* Imagem */

        let alerta_imagem = document.createElement("span");
        alerta_imagem.id = "alerta_imagem";
        alerta_imagem.name = "alerta_imagem";
        alerta_imagem.className = "alerta_formulario";

        // criando input 
        var imagem = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        imagem.setAttribute("type", "file");

        // criando nome para o input 
        imagem.name = "foto_logo";

        // criando id para o input 
        imagem.id = "foto_logo";

        // criando div para receber o input e label
        var div_imagem = document.createElement("div");

        // criando label 
        var label_imagem = document.createElement("label");

        // inserindo conteúdo no label
        label_imagem.textContent = "Imagem *";

        // atribuindo classe para a div
        div_imagem.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_imagem);

        // inserindo label  dentro da div
        div_imagem.appendChild(label_imagem);

        // inserindo input dentro da div 
        div_imagem.appendChild(imagem);

        // inserindo alerta na div
        div_imagem.appendChild(alerta_imagem);

        /* Imagem Secundária */

        let alerta_imagem_secundaria = document.createElement("span");
        alerta_imagem_secundaria.id = "alerta_imagem_secundaria";
        alerta_imagem_secundaria.name = "alerta_imagem_secundaria";
        alerta_imagem_secundaria.className = "alerta_formulario";

        // criando input 
        var imagem_secundaria = document.createElement("input");

        // atribuindo tipo "text" ao input previsão de formatura
        imagem_secundaria.setAttribute("type", "file");

        // criando nome para o input 
        imagem_secundaria.name = "imagem";

        // criando id para o input 
        imagem_secundaria.id = "foto_logo_secundaria";

        // criando div para receber o input e label
        var div_imagem_secundaria = document.createElement("div");

        // criando label 
        var label_imagem_secundaria = document.createElement("label");

        // inserindo conteúdo no label
        label_imagem_secundaria.textContent = "Imagem Secudária*";

        // atribuindo classe para a div
        div_imagem_secundaria.className = "celula_metade";

        // inserindo div dentro da div corpo conteúdo
        recipiente.appendChild(div_imagem_secundaria);

        // inserindo label  dentro da div
        div_imagem_secundaria.appendChild(label_imagem_secundaria);

        // inserindo input dentro da div 
        div_imagem_secundaria.appendChild(imagem_secundaria);

        // inserindo alerta na div
        div_imagem_secundaria.appendChild(alerta_imagem_secundaria);

    } else {
        //console.log("Apaga tudo!");

        var corpo_recipiente = document.getElementById("corpo_recipiente");
        corpo_recipiente.removeChild(recipiente);
    }

}

function adicionar_facilitador() {
    var id_facilitador = document.getElementById("facilitador");
    var alerta_facilitador = document.getElementById("facilitador");

    var variaveis = location.search.split("?");
    var id = variaveis[1].split("=");

    var xhttp = new XMLHttpRequest();
    var recipiente = document.getElementById("recipiente");
    if (id_facilitador.value == "") {
        id_facilitador.focus;
        alerta_facilitador.textContent = "Favor informar o facilitador!";
    } else {
        if (sessionStorage.contador == undefined) {
            sessionStorage.contador = 0;
        }
        // somando valor 1 na variavel contador pois aqui foi criado os elementos
        sessionStorage.contador = Number(sessionStorage.contador) + 1;

        var bloco_adicionado = document.createElement("div");

        // criando a div e linha divisoria
        //var contador_evento = i + 1;
        let total_divisoria = document.createElement("div");
        let label_facilitador = document.createElement("label");
        label_facilitador.textContent = "Facilitador";
        let linha_divisoria = document.createElement("hr");
        total_divisoria.className = "celula_formulario_total";
        total_divisoria.appendChild(label_facilitador);
        total_divisoria.appendChild(linha_divisoria);
        bloco_adicionado.appendChild(total_divisoria);
        recipiente.appendChild(bloco_adicionado);

        // inserindo id para div
        bloco_adicionado.id = "bloco_adicionado_" + sessionStorage.contador;

        // criando input 
        let facilitador_armazenado = document.createElement("input");

        // atribuindo tipo "text" ao input 
        facilitador_armazenado.setAttribute("type", "text");
        facilitador_armazenado.readOnly = "readOnly";

        //PEGANDO VALOR DO INPUT 
        facilitador_armazenado.value = document.getElementById('facilitador').value;


        // criando div para receber o input e label
        let div_facilitador = document.createElement("div");

        // criando label 
        let label_facilitadors = document.createElement("label");

        // inserindo conteúdo no label
        label_facilitadors.textContent = "Facilitador";

        // atribuindo classe para a div 
        div_facilitador.className = "celula_metade";

        // inserindo div  dentro da div corpo conteúdo
        recipiente.appendChild(bloco_adicionado);
        bloco_adicionado.appendChild(div_facilitador);

        // inserindo label  dentro da div 
        div_facilitador.appendChild(label_facilitadors);

        // inserindo input  dentro da div 
        div_facilitador.appendChild(facilitador_armazenado);

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
                var id_facilitador = xhttp.responseText;

                var alerta = document.getElementById("alerta-sucesso");
                var alerta_texto = document.getElementById("alerta-sucesso-texto");
                alerta.style.display = "block";
                alerta_texto.textContent = "Facilitador adicionado com sucesso!";

                // criando botão Excluir
                var botao_excluir = document.createElement("a");
                botao_excluir.textContent = "Excluir";
                botao_excluir.id = "botao_excluir_" + sessionStorage.contador;
                botao_excluir.href = "javascript: excluir_bloco(" + sessionStorage.contador + "," + id_facilitador + ")";
                botao_excluir.className = "botao_excluir";

                //criando div para o botão
                var div_total = document.createElement("div");
                div_total.className = "celula_formulario_total";
                bloco_adicionado.appendChild(div_total);
                div_total.appendChild(botao_excluir);

            }
        };
        xhttp.open("POST", caminho + "servico/cadastro/agenda/agenda_facilitador_inserir.php", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("id=" + id[1] + "&id_facilitador=" + id_facilitador.value);
        //console.log("id=" + id[1] + "&id_facilitador=" + id_facilitador.value);
    }
}


function zerar_contador() {
    sessionStorage.clear();
}

function excluir_bloco(contador, id_agenda_facilitador) {
    var xhttp = new XMLHttpRequest();

    var bloco_adicionado = document.getElementById("bloco_adicionado_" + contador);
    var recipiente = document.getElementById("recipiente");

    recipiente.removeChild(bloco_adicionado);

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "OK") {
                //console.log(xhttp.responseText);
                var alerta = document.getElementById("alerta-sucesso");
                var alerta_texto = document.getElementById("alerta-sucesso-texto");

                alerta.style.display = "block";
                alerta_texto.textContent = "Facilitador excluído com sucesso!";
            }
        }
    };
    xhttp.open("POST", caminho + "servico/cadastro/agenda/agenda_facilitador_exclusao.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id_agenda_facilitador=" + id_agenda_facilitador);
}

function carrega_facilitador(id) {
    var variaveis = location.search.split("?");
    var id = variaveis[1].split("=");
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            var resposta = xhttp.responseText;
            var dados = JSON.parse(resposta);


            //console.log(xhttp.responseText);

            if (dados != null) {

                var quantidade_de_registros = dados.length;

                for (i = 0; i < quantidade_de_registros; i++) {
                    if (sessionStorage.contador == undefined) {
                        sessionStorage.contador = 0;
                    }

                    // somando valor 1 na variavel contador pois aqui foi criado os elementos
                    sessionStorage.contador = Number(sessionStorage.contador) + 1;

                    var bloco_adicionado = document.createElement("div");

                    // criando a div e linha divisoria
                    //var contador_evento = i + 1;
                    let total_divisoria = document.createElement("div");
                    let label_facilitador = document.createElement("label");
                    label_facilitador.textContent = "Facilitador";
                    let linha_divisoria = document.createElement("hr");
                    total_divisoria.className = "celula_formulario_total";
                    total_divisoria.appendChild(label_facilitador);
                    total_divisoria.appendChild(linha_divisoria);
                    bloco_adicionado.appendChild(total_divisoria);
                    recipiente.appendChild(bloco_adicionado);

                    // inserindo id para div
                    bloco_adicionado.id = "bloco_adicionado_" + sessionStorage.contador;

                    // criando input 
                    let facilitador_armazenado = document.createElement("input");

                    // atribuindo tipo "text" ao input 
                    facilitador_armazenado.setAttribute("type", "text");
                    facilitador_armazenado.readOnly = "readOnly";

                    //PEGANDO VALOR DO INPUT 
                    facilitador_armazenado.value = dados[i].nome;

                    // criando div para receber o input e label
                    let div_facilitador = document.createElement("div");

                    // criando label 
                    let label_facilitadors = document.createElement("label");

                    // inserindo conteúdo no label
                    label_facilitadors.textContent = "Facilitador";

                    // atribuindo classe para a div 
                    div_facilitador.className = "celula_metade";

                    // inserindo div  dentro da div corpo conteúdo
                    recipiente.appendChild(bloco_adicionado);
                    bloco_adicionado.appendChild(div_facilitador);

                    // inserindo label  dentro da div 
                    div_facilitador.appendChild(label_facilitadors);

                    // inserindo input  dentro da div 
                    div_facilitador.appendChild(facilitador_armazenado);

                    // criando botão Excluir
                    var botao_excluir = document.createElement("a");
                    botao_excluir.textContent = "Excluir";
                    botao_excluir.id = "botao_excluir_" + sessionStorage.contador;
                    botao_excluir.href = "javascript: excluir_bloco(" + sessionStorage.contador + "," + dados[i].id_agenda_facilitador + ")";
                    botao_excluir.className = "botao_excluir";

                    //criando div para o botão
                    var div_total = document.createElement("div");
                    div_total.className = "celula_formulario_total";
                    bloco_adicionado.appendChild(div_total);
                    div_total.appendChild(botao_excluir);
                }
            }
        }
    };
    xhttp.open("POST", caminho + "servico/cadastro/agenda/agenda_facilitador_requisicao.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id=" + id[1]);
}

function carrega_agenda(id) {

    var variaveis = location.search.split("?");
    var id = variaveis[1].split("=");
    var xhttp = new XMLHttpRequest();

    var nome = document.getElementById("nome");
    var categoria = document.getElementById("categoria");
    var local = document.getElementById("local");

    var recipiente = document.getElementById("recipiente");

    xhttp.onreadystatechange = function () {
        //console.log(xhttp.responseText);
        if (this.readyState == 4 && this.status == 200) {
            var resposta = xhttp.responseText;
            var dados = JSON.parse(resposta);


            //console.log(xhttp.responseText);

            if (dados != null) {

                var quantidade_de_registros = dados.length;

                for (i = 0; i < quantidade_de_registros; i++) {
                    //console.log(xhttp.responseText);
                    //console.log(dados[i].ensino);
                    if (dados[i].local == "Físico") {
                        // variavel para fazer controle de variaveis de inserções
                        //console.log(Number(sessionStorage.contador));

                        nome.value = dados[i].nome;
                        categoria.value = dados[i].categoria;
                        local.value = dados[i].local;
                        sobre.value = dados[i].sobre;

                        if (sessionStorage.contador == undefined) {
                            sessionStorage.contador = 0;
                            //console.log("Contador Inicializado: " + sessionStorage.contador);
                        }
                        // somando valor 1 na variavel contador pois aqui foi criado os elementos
                        sessionStorage.contador = Number(sessionStorage.contador) + 1;
                        //console.log(sessionStorage.contador);


                        /* LOCALIDADE */
                        // CRIANDO ALERTA SPAN ///////////////////////////////////////////////////////////
                        let alerta_localidade = document.createElement("span");
                        alerta_localidade.id = "alerta_localidade";
                        alerta_localidade.name = "alerta_localidade";
                        alerta_localidade.className = "alerta_formulario";

                        // criando input 
                        var localidade = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        localidade.setAttribute("type", "text");

                        // criando nome para o input 
                        localidade.name = "localidade";

                        // criando id para o input 
                        localidade.id = "localidade";

                        // travando tamanho do input
                        localidade.maxLength = "150";
                        localidade.value = dados[i].localidade;

                        // criando div para receber o input e label
                        var div_localidade = document.createElement("div");

                        // criando label 
                        var label_localidade = document.createElement("label");

                        // inserindo conteúdo no label
                        label_localidade.textContent = "Localidade";

                        // atribuindo classe para a div
                        div_localidade.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_localidade);

                        // inserindo label  dentro da div
                        div_localidade.appendChild(label_localidade);

                        // inserindo input dentro da div 
                        div_localidade.appendChild(localidade);

                        // inserindo alerta na div
                        div_localidade.appendChild(alerta_localidade);

                        /* CEP */

                        let alerta_cep = document.createElement("span");
                        alerta_cep.id = "alerta_cep";
                        alerta_cep.name = "alerta_cep";
                        alerta_cep.className = "alerta_formulario";

                        // criando input 
                        var cep = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        cep.setAttribute("type", "text");

                        // criando nome para o input 
                        cep.name = "cep";

                        // criando id para o input 
                        cep.id = "cep";

                        // travando tamanho do input
                        localidade.maxLength = "11";

                        cep.value = dados[i].cep;

                        // criando div para receber o input e label
                        var div_cep = document.createElement("div");

                        // criando label 
                        var label_cep = document.createElement("label");

                        // inserindo conteúdo no label
                        label_cep.textContent = "CEP";

                        // atribuindo classe para a div
                        div_cep.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_cep);

                        // inserindo label  dentro da div
                        div_cep.appendChild(label_cep);

                        // inserindo input dentro da div 
                        div_cep.appendChild(cep);

                        // inserindo alerta na div
                        div_cep.appendChild(alerta_cep);

                        /* Endereço */

                        let alerta_endereco = document.createElement("span");
                        alerta_endereco.id = "alerta_endereco";
                        alerta_endereco.name = "alerta_endereco";
                        alerta_endereco.className = "alerta_formulario";

                        // criando input 
                        var endereco = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        endereco.setAttribute("type", "text");

                        // criando nome para o input 
                        endereco.name = "endereco";

                        // criando id para o input 
                        endereco.id = "endereco";

                        // travando tamanho do input
                        endereco.maxLength = 200;

                        endereco.value = dados[i].endereco;

                        // criando div para receber o input e label
                        var div_endereco = document.createElement("div");

                        // criando label 
                        var label_endereco = document.createElement("label");

                        // inserindo conteúdo no label
                        label_endereco.textContent = "Endereço";

                        // atribuindo classe para a div
                        div_endereco.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_endereco);

                        // inserindo label  dentro da div
                        div_endereco.appendChild(label_endereco);

                        // inserindo input dentro da div 
                        div_endereco.appendChild(endereco);

                        // inserindo alerta na div
                        div_endereco.appendChild(alerta_endereco);

                        /* Numero */

                        let alerta_numero = document.createElement("span");
                        alerta_numero.id = "alerta_numero";
                        alerta_numero.name = "alerta_numero";
                        alerta_numero.className = "alerta_formulario";

                        // criando input 
                        var numero = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        numero.setAttribute("type", "text");

                        // criando nome para o input 
                        numero.name = "numero";

                        // criando id para o input 
                        numero.id = "numero";

                        // travando tamanho do input
                        numero.maxLength = 10;

                        numero.value = dados[i].numero;

                        // criando div para receber o input e label
                        var div_numero = document.createElement("div");

                        // criando label 
                        var label_numero = document.createElement("label");

                        // inserindo conteúdo no label
                        label_numero.textContent = "Número";

                        // atribuindo classe para a div
                        div_numero.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_numero);

                        // inserindo label  dentro da div
                        div_numero.appendChild(label_numero);

                        // inserindo input dentro da div 
                        div_numero.appendChild(numero);

                        // inserindo alerta na div
                        div_numero.appendChild(alerta_numero);

                        /* Bairro */

                        let alerta_bairro = document.createElement("span");
                        alerta_bairro.id = "alerta_bairro";
                        alerta_bairro.name = "alerta_bairro";
                        alerta_bairro.className = "alerta_formulario";

                        // criando input 
                        var bairro = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        bairro.setAttribute("type", "text");

                        // criando nome para o input 
                        bairro.name = "bairro";

                        // criando id para o input 
                        bairro.id = "bairro";

                        // travando tamanho do input
                        bairro.maxLength = 100;

                        bairro.value = dados[i].bairro;

                        // criando div para receber o input e label
                        var div_bairro = document.createElement("div");

                        // criando label 
                        var label_bairro = document.createElement("label");

                        // inserindo conteúdo no label
                        label_bairro.textContent = "Bairro";

                        // atribuindo classe para a div
                        div_bairro.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_bairro);

                        // inserindo label  dentro da div
                        div_bairro.appendChild(label_bairro);

                        // inserindo input dentro da div 
                        div_bairro.appendChild(bairro);

                        // inserindo alerta na div
                        div_bairro.appendChild(alerta_bairro);

                        /* Cidade */

                        let alerta_cidade = document.createElement("span");
                        alerta_cidade.id = "alerta_cidade";
                        alerta_cidade.name = "alerta_cidade";
                        alerta_cidade.className = "alerta_formulario";

                        // criando input 
                        var cidade = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        cidade.setAttribute("type", "text");

                        // criando nome para o input 
                        cidade.name = "cidade";

                        // criando id para o input 
                        cidade.id = "cidade";

                        // travando tamanho do input
                        cidade.maxLength = 100;

                        cidade.value = dados[i].cidade;

                        // criando div para receber o input e label
                        var div_cidade = document.createElement("div");

                        // criando label 
                        var label_cidade = document.createElement("label");

                        // inserindo conteúdo no label
                        label_cidade.textContent = "Cidade";

                        // atribuindo classe para a div
                        div_cidade.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_cidade);

                        // inserindo label  dentro da div
                        div_cidade.appendChild(label_cidade);

                        // inserindo input dentro da div 
                        div_cidade.appendChild(cidade);

                        // inserindo alerta na div
                        div_cidade.appendChild(alerta_cidade);

                        /* Estado */

                        let alerta_estado = document.createElement("span");
                        alerta_estado.id = "alerta_estado";
                        alerta_estado.name = "alerta_estado";
                        alerta_estado.className = "alerta_formulario";

                        // criando input 
                        var estado = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        estado.setAttribute("type", "text");

                        // criando nome para o input 
                        estado.name = "estado";

                        // criando id para o input 
                        estado.id = "estado";

                        // travando tamanho do input
                        estado.maxLength = 100;

                        estado.value = dados[i].estado;

                        // criando div para receber o input e label
                        var div_estado = document.createElement("div");

                        // criando label 
                        var label_estado = document.createElement("label");

                        // inserindo conteúdo no label
                        label_estado.textContent = "Estado";

                        // atribuindo classe para a div
                        div_estado.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_estado);

                        // inserindo label  dentro da div
                        div_estado.appendChild(label_estado);

                        // inserindo input dentro da div 
                        div_estado.appendChild(estado);

                        // inserindo alerta na div
                        div_estado.appendChild(alerta_estado);

                        /* Complemento */

                        let alerta_complemento = document.createElement("span");
                        alerta_complemento.id = "alerta_complemento";
                        alerta_complemento.name = "alerta_complemento";
                        alerta_complemento.className = "alerta_formulario";

                        // criando input 
                        var complemento = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        complemento.setAttribute("type", "text");

                        // criando nome para o input 
                        complemento.name = "complemento";

                        // criando id para o input 
                        complemento.id = "complemento";

                        // travando tamanho do input
                        complemento.maxLength = 100;

                        complemento.value = dados[i].complemento;

                        // criando div para receber o input e label
                        var div_complemento = document.createElement("div");

                        // criando label 
                        var label_complemento = document.createElement("label");

                        // inserindo conteúdo no label
                        label_complemento.textContent = "Complemento";

                        // atribuindo classe para a div
                        div_complemento.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_complemento);

                        // inserindo label  dentro da div
                        div_complemento.appendChild(label_complemento);

                        // inserindo input dentro da div 
                        div_complemento.appendChild(complemento);

                        // inserindo alerta na div
                        div_complemento.appendChild(alerta_complemento);


                        /* Google Maps */

                        let alerta_google_maps = document.createElement("span");
                        alerta_google_maps.id = "alerta_google_maps";
                        alerta_google_maps.name = "alerta_google_maps";
                        alerta_google_maps.className = "alerta_formulario";

                        // criando input 
                        var google_maps = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        google_maps.setAttribute("type", "text");

                        // criando nome para o input 
                        google_maps.name = "google_maps";

                        // criando id para o input 
                        google_maps.id = "google_maps";

                        // travando tamanho do input
                        google_maps.maxLength = 300;

                        google_maps.value = dados[i].google_maps;

                        // criando div para receber o input e label
                        var div_google_maps = document.createElement("div");

                        // criando label 
                        var label_google_maps = document.createElement("label");

                        // inserindo conteúdo no label
                        label_google_maps.textContent = "Google Maps";

                        // atribuindo classe para a div
                        div_google_maps.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_google_maps);

                        // inserindo label  dentro da div
                        div_google_maps.appendChild(label_google_maps);

                        // inserindo input dentro da div 
                        div_google_maps.appendChild(google_maps);

                        // inserindo alerta na div
                        div_google_maps.appendChild(alerta_google_maps);

                        /* Data */

                        let alerta_data = document.createElement("span");
                        alerta_data.id = "alerta_data";
                        alerta_data.name = "alerta_data";
                        alerta_data.className = "alerta_formulario";

                        // criando input 
                        var data = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        data.setAttribute("type", "date");

                        // criando nome para o input 
                        data.name = "data";

                        // criando id para o input 
                        data.id = "data";

                        data.value = dados[i].data;

                        // criando div para receber o input e label
                        var div_data = document.createElement("div");

                        // criando label 
                        var label_data = document.createElement("label");

                        // inserindo conteúdo no label
                        label_data.textContent = "Data";

                        // atribuindo classe para a div
                        div_data.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_data);

                        // inserindo label  dentro da div
                        div_data.appendChild(label_data);

                        // inserindo input dentro da div 
                        div_data.appendChild(data);

                        // inserindo alerta na div
                        div_data.appendChild(alerta_data);

                        /* Horário */

                        let alerta_horario = document.createElement("span");
                        alerta_horario.id = "alerta_horario";
                        alerta_horario.name = "alerta_horario";
                        alerta_horario.className = "alerta_formulario";

                        // criando input 
                        var horario = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        horario.setAttribute("type", "time");

                        // criando nome para o input 
                        horario.name = "horario";

                        // criando id para o input 
                        horario.id = "horario";

                        horario.value = dados[i].horario;

                        // criando div para receber o input e label
                        var div_horario = document.createElement("div");

                        // criando label 
                        var label_horario = document.createElement("label");

                        // inserindo conteúdo no label
                        label_horario.textContent = "Horário";

                        // atribuindo classe para a div
                        div_horario.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_horario);

                        // inserindo label  dentro da div
                        div_horario.appendChild(label_horario);

                        // inserindo input dentro da div 
                        div_horario.appendChild(horario);

                        // inserindo alerta na div
                        div_horario.appendChild(alerta_horario);


                        /* Imagem */

                        let alerta_imagem = document.createElement("span");
                        alerta_imagem.id = "alerta_imagem";
                        alerta_imagem.name = "alerta_imagem";
                        alerta_imagem.className = "alerta_formulario";

                        // criando input 
                        // criando input 
                        var imagem = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        imagem.setAttribute("type", "file");

                        // criando nome para o input 
                        imagem.name = "foto_logo";

                        // criando id para o input 
                        imagem.id = "foto_logo";

                        // criando div para receber o input e label
                        var div_imagem = document.createElement("div");

                        // criando label 
                        var label_imagem = document.createElement("label");

                        // inserindo conteúdo no label
                        label_imagem.textContent = "Imagem";

                        // atribuindo classe para a div
                        div_imagem.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_imagem);

                        // inserindo label  dentro da div
                        div_imagem.appendChild(label_imagem);

                        // inserindo input dentro da div 
                        div_imagem.appendChild(imagem);

                        // inserindo alerta na div
                        div_imagem.appendChild(alerta_imagem);


                        /* Imagem */

                        var imagem = document.createElement("img");

                        // criando nome para o input 
                        imagem.name = "foto_logo_armazenada";

                        // criando id para o input 
                        imagem.id = "foto_logoarmazenada";

                        imagem.setAttribute("width", "200");
                        imagem.setAttribute("height", "auto");

                        imagem.setAttribute("src", "../uploads/" + dados[i].imagem_principal);

                        // imagem.value = dados[i].imagem;

                        // criando div para receber o input e label
                        var div_imagem = document.createElement("div");

                        // atribuindo classe para a div
                        div_imagem.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_imagem);

                        // inserindo input dentro da div 
                        div_imagem.appendChild(imagem);

                        // inserindo alerta na div
                        div_imagem.appendChild(alerta_imagem);

                        /* Imagem Secundária */

                        let alerta_imagem_secundaria = document.createElement("span");
                        alerta_imagem_secundaria.id = "alerta_imagem_secundaria";
                        alerta_imagem_secundaria.name = "alerta_imagem_secundaria";
                        alerta_imagem_secundaria.className = "alerta_formulario";

                        // criando input 
                        var imagem_secundaria = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        imagem_secundaria.setAttribute("type", "file");

                        // criando nome para o input 
                        imagem_secundaria.name = "imagem";

                        // criando id para o input 
                        imagem_secundaria.id = "foto_logo_secundaria";

                        // criando div para receber o input e label
                        var div_imagem_secundaria = document.createElement("div");

                        // criando label 
                        var label_imagem_secundaria = document.createElement("label");

                        // inserindo conteúdo no label
                        label_imagem_secundaria.textContent = "Imagem Secudária*";

                        // atribuindo classe para a div
                        div_imagem_secundaria.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_imagem_secundaria);

                        // inserindo label  dentro da div
                        div_imagem_secundaria.appendChild(label_imagem_secundaria);

                        // inserindo input dentro da div 
                        div_imagem_secundaria.appendChild(imagem_secundaria);

                        // inserindo alerta na div
                        div_imagem_secundaria.appendChild(alerta_imagem_secundaria);

                        /* Imagem */

                        var imagem_secundaria = document.createElement("img");

                        // criando nome para o input 
                        imagem_secundaria.name = "foto_logo_secundaria_armazenada";

                        // criando id para o input 
                        imagem_secundaria.id = "foto_logo_secundaria_armazenada";

                        imagem_secundaria.setAttribute("width", "200");
                        imagem.setAttribute("height", "auto");

                        imagem_secundaria.setAttribute("src", "../uploads/" + dados[i].imagem_secundaria);

                        // imagem.value = dados[i].imagem;

                        // criando div para receber o input e label
                        var div_imagem_secundaria = document.createElement("div");

                        // atribuindo classe para a div
                        div_imagem_secundaria.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_imagem_secundaria);

                        // inserindo input dentro da div 
                        div_imagem_secundaria.appendChild(imagem_secundaria);

                        // inserindo alerta na div
                        div_imagem_secundaria.appendChild(alerta_imagem_secundaria);

                    } else {
                        /* Endereço */

                        nome.value = dados[i].nome;
                        categoria.value = dados[i].categoria;
                        sobre.value = dados[i].sobre;
                        local.value = dados[i].local;

                        let alerta_endereco = document.createElement("span");
                        alerta_endereco.id = "alerta_endereco";
                        alerta_endereco.name = "alerta_endereco";
                        alerta_endereco.className = "alerta_formulario";

                        // criando input 
                        var endereco = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        endereco.setAttribute("type", "text");

                        // criando nome para o input 
                        endereco.name = "endereco";

                        // criando id para o input 
                        endereco.id = "endereco";

                        // travando tamanho do input
                        endereco.maxLength = 200;

                        endereco.value = dados[i].endereco;

                        // criando div para receber o input e label
                        var div_endereco = document.createElement("div");

                        // criando label 
                        var label_endereco = document.createElement("label");

                        // inserindo conteúdo no label
                        label_endereco.textContent = "Endereço";

                        // atribuindo classe para a div
                        div_endereco.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_endereco);

                        // inserindo label  dentro da div
                        div_endereco.appendChild(label_endereco);

                        // inserindo input dentro da div 
                        div_endereco.appendChild(endereco);

                        // inserindo alerta na div
                        div_endereco.appendChild(alerta_endereco);

                        /* Data */

                        let alerta_data = document.createElement("span");
                        alerta_data.id = "alerta_data";
                        alerta_data.name = "alerta_data";
                        alerta_data.className = "alerta_formulario";

                        // criando input 
                        var data = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        data.setAttribute("type", "date");

                        // criando nome para o input 
                        data.name = "data";

                        // criando id para o input 
                        data.id = "data";

                        data.value = dados[i].data;

                        // criando div para receber o input e label
                        var div_data = document.createElement("div");

                        // criando label 
                        var label_data = document.createElement("label");

                        // inserindo conteúdo no label
                        label_data.textContent = "Data";

                        // atribuindo classe para a div
                        div_data.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_data);

                        // inserindo label  dentro da div
                        div_data.appendChild(label_data);

                        // inserindo input dentro da div 
                        div_data.appendChild(data);

                        // inserindo alerta na div
                        div_data.appendChild(alerta_data);

                        /* Horário */

                        let alerta_horario = document.createElement("span");
                        alerta_horario.id = "alerta_horario";
                        alerta_horario.name = "alerta_horario";
                        alerta_horario.className = "alerta_formulario";

                        // criando input 
                        var horario = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        horario.setAttribute("type", "time");

                        // criando nome para o input 
                        horario.name = "horario";

                        // criando id para o input 
                        horario.id = "horario";

                        horario.value = dados[i].horario;

                        // criando div para receber o input e label
                        var div_horario = document.createElement("div");

                        // criando label 
                        var label_horario = document.createElement("label");

                        // inserindo conteúdo no label
                        label_horario.textContent = "Horário";

                        // atribuindo classe para a div
                        div_horario.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_horario);

                        // inserindo label  dentro da div
                        div_horario.appendChild(label_horario);

                        // inserindo input dentro da div 
                        div_horario.appendChild(horario);

                        // inserindo alerta na div
                        div_horario.appendChild(alerta_horario);


                        /* Imagem */

                        let alerta_imagem = document.createElement("span");
                        alerta_imagem.id = "alerta_imagem";
                        alerta_imagem.name = "alerta_imagem";
                        alerta_imagem.className = "alerta_formulario";

                        // criando input 
                        // criando input 
                        var imagem = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        imagem.setAttribute("type", "file");
                        //var imagem = document.createElement("img");

                        // atribuindo tipo "text" ao input previsão de formatura
                        // imagem.setAttribute("type", "img");

                        // criando nome para o input 
                        imagem.name = "foto_logo";

                        // criando id para o input 
                        imagem.id = "foto_logo";

                        // imagem.setAttribute("width", "200");
                        // imagem.setAttribute("height", "auto");

                        // imagem.setAttribute("src", "../uploads/" + dados[i].imagem);

                        // imagem.value = dados[i].imagem;

                        // criando div para receber o input e label
                        var div_imagem = document.createElement("div");

                        // criando label 
                        var label_imagem = document.createElement("label");

                        // inserindo conteúdo no label
                        label_imagem.textContent = "Imagem";

                        // atribuindo classe para a div
                        div_imagem.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_imagem);

                        // inserindo label  dentro da div
                        div_imagem.appendChild(label_imagem);

                        // inserindo input dentro da div 
                        div_imagem.appendChild(imagem);

                        // inserindo alerta na div
                        div_imagem.appendChild(alerta_imagem);


                        /* Imagem */

                        var imagem = document.createElement("img");

                        // criando nome para o input 
                        imagem.name = "foto_logo_armazenada";

                        // criando id para o input 
                        imagem.id = "foto_logoarmazenada";

                        imagem.setAttribute("width", "200");
                        imagem.setAttribute("height", "auto");

                        imagem.setAttribute("src", "../uploads/" + dados[i].imagem_principal);

                        // imagem.value = dados[i].imagem;

                        // criando div para receber o input e label
                        var div_imagem = document.createElement("div");

                        // atribuindo classe para a div
                        div_imagem.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_imagem);

                        // inserindo input dentro da div 
                        div_imagem.appendChild(imagem);

                        // inserindo alerta na div
                        div_imagem.appendChild(alerta_imagem);

                        /* Imagem Secundária */

                        let alerta_imagem_secundaria = document.createElement("span");
                        alerta_imagem_secundaria.id = "alerta_imagem_secundaria";
                        alerta_imagem_secundaria.name = "alerta_imagem_secundaria";
                        alerta_imagem_secundaria.className = "alerta_formulario";

                        // criando input 
                        var imagem_secundaria = document.createElement("input");

                        // atribuindo tipo "text" ao input previsão de formatura
                        imagem_secundaria.setAttribute("type", "file");

                        // criando nome para o input 
                        imagem_secundaria.name = "imagem";

                        // criando id para o input 
                        imagem_secundaria.id = "foto_logo_secundaria";

                        // criando div para receber o input e label
                        var div_imagem_secundaria = document.createElement("div");

                        // criando label 
                        var label_imagem_secundaria = document.createElement("label");

                        // inserindo conteúdo no label
                        label_imagem_secundaria.textContent = "Imagem Secudária*";

                        // atribuindo classe para a div
                        div_imagem_secundaria.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_imagem_secundaria);

                        // inserindo label  dentro da div
                        div_imagem_secundaria.appendChild(label_imagem_secundaria);

                        // inserindo input dentro da div 
                        div_imagem_secundaria.appendChild(imagem_secundaria);

                        // inserindo alerta na div
                        div_imagem_secundaria.appendChild(alerta_imagem_secundaria);

                        /* Imagem */

                        var imagem_secundaria = document.createElement("img");

                        // criando nome para o input 
                        imagem_secundaria.name = "foto_logo_secundaria_armazenada";

                        // criando id para o input 
                        imagem_secundaria.id = "foto_logo_secundaria_armazenada";

                        imagem_secundaria.setAttribute("width", "200");
                        imagem_secundaria.setAttribute("height", "auto");

                        imagem_secundaria.setAttribute("src", "../uploads/" + dados[i].imagem_secundaria);

                        // imagem.value = dados[i].imagem;

                        // criando div para receber o input e label
                        var div_imagem_secundaria = document.createElement("div");

                        // atribuindo classe para a div
                        div_imagem_secundaria.className = "celula_metade";

                        // inserindo div dentro da div corpo conteúdo
                        recipiente.appendChild(div_imagem_secundaria);

                        // inserindo input dentro da div 
                        div_imagem_secundaria.appendChild(imagem_secundaria);

                        // inserindo alerta na div
                        div_imagem_secundaria.appendChild(alerta_imagem_secundaria);
                    }
                }
            }
        }
    };
    xhttp.open("POST", caminho + "servico/cadastro/agenda/agenda_requisicao.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id=" + id[1]);
    //console.log("id=" + id[1]);
}

function cadastrar() {

    var nome = document.getElementById("nome");
    var categoria = document.getElementById("categoria");
    var local = document.getElementById("local");
    var sobre = document.getElementById("sobre");
    var localidade = document.getElementById("localidade");
    var cep = document.getElementById("cep");
    var endereco = document.getElementById("endereco");
    var numero = document.getElementById("numero");
    var bairro = document.getElementById("bairro");
    var cidade = document.getElementById("cidade");
    var estado = document.getElementById("estado");
    var complemento = document.getElementById("complemento");
    var google_maps = document.getElementById("google_maps");
    var data = document.getElementById("data");
    var horario = document.getElementById("horario");
    var foto_logo = document.getElementById("foto_logo");
    var foto_logo_secundaria = document.getElementById("foto_logo_secundaria");

    var alerta_nome = document.getElementById("alerta_nome");
    var alerta_categoria = document.getElementById("alerta_categoria");
    var alerta_local = document.getElementById("alerta_local");
    var alerta_sobre = document.getElementById("alerta_sobre");
    var alerta_localidade = document.getElementById("alerta_localidade");
    var alerta_cep = document.getElementById("alerta_cep");
    var alerta_endereco = document.getElementById("alerta_endereco");
    var alerta_numero = document.getElementById("alerta_numero");
    var alerta_bairro = document.getElementById("alerta_bairro");
    var alerta_cidade = document.getElementById("alerta_cidade");
    var alerta_estado = document.getElementById("alerta_estado");
    var alerta_complemento = document.getElementById("alerta_complemento");
    var alerta_google_maps = document.getElementById("alerta_google_maps");
    var alerta_data = document.getElementById("alerta_data");
    var alerta_horario = document.getElementById("alerta_horario");
    var alerta_imagem = document.getElementById("alerta_imagem");
    var alerta_imagem_secundaria = document.getElementById("alerta_imagem_secundaria");


    if (nome.value == "") {
        nome.focus();
        alerta_nome.textContent = "Favor informar o nome!";
    } else if (categoria.value == "") {
        categoria.focus();
        alerta_categoria.textContent = "Favor informar a categoria!";
    } else if (local.value == "") {
        local.focus();
        alerta_local.textContent = "Favor informar o local!";
    } else if (sobre.value == "") {
        sobre.focus();
        alerta_sobre.textContent = "Favor informar sobre o evento!";
    } else {
        if (local.value == "Físico") {
            if (localidade.value == "") {
                localidade.focus();
                alerta_localidade.textContent = "Favor informar a localidade!";
            } else if (cep.value == "") {
                cep.focus();
                alerta_cep.textContent = "Favor informar o cep!";
            } else if (endereco.value == "") {
                endereco.focus();
                alerta_endereco.textContent = "Favor informar o endereço!";
            } else if (numero.value == "") {
                numero.focus();
                alerta_numero.textContent = "Favor informar o número!";
            } else if (bairro.value == "") {
                bairro.focus();
                alerta_bairro.textContent = "Favor informar o bairro!";
            } else if (cidade.value == "") {
                cidade.focus();
                alerta_cidade.textContent = "Favor informar a cidade!";
            } else if (estado.value == "") {
                estado.focus();
                alerta_estado.textContent = "Favor informar o estado!";
            } else if (data.value == "") {
                data.focus();
                alerta_data.textContent = "Favor informar a data!";
            } else if (horario.value == "") {
                horario.focus();
                alerta_horario.textContent = "Favor informar o horário!";
            } else if (foto_logo.value == "") {
                foto_logo.focus();
                alerta_imagem.textContent = "Favor informar o imagem!";
            } 
            else if (foto_logo_secundaria.value == "") {
                foto_logo_secundaria.focus();
                alerta_imagem_secundaria.textContent = "Favor informar o imagem!";
            } else {

                var xhttp = new XMLHttpRequest();

                // Form Data
                var formData = new FormData();
                formData.set("nome", nome.value);
                formData.set("categoria", categoria.value);
                formData.set("local", local.value);
                formData.set("sobre", sobre.value);
                formData.set("localidade", localidade.value);
                formData.set("cep", cep.value);
                formData.set("endereco", endereco.value);
                formData.set("numero", numero.value);
                formData.set("complemento", complemento.value);
                formData.set("bairro", bairro.value);
                formData.set("cidade", cidade.value);
                formData.set("estado", estado.value);
                formData.set("google_maps", google_maps.value);
                formData.set("data", data.value);
                formData.set("horario", horario.value);

                if (foto_logo != "") {
                    if (foto_logo.files && foto_logo.files.length == 1) {
                        var file = foto_logo.files[0]
                        formData.set("foto_logo", file, file.name);
                    }
                }
                if (foto_logo_secundaria != "") {
                    if (foto_logo_secundaria.files && foto_logo_secundaria.files.length == 1) {
                        var file = foto_logo_secundaria.files[0]
                        formData.set("foto_logo_secundaria", file, file.name);
                    }
                }

                xhttp.onreadystatechange = function () {
                    console.log(this.responseText);
                    if (this.readyState == 4 && this.status == 200) {
                        window.location = caminho + "agenda/agenda_facilitador.php?id=" + this.responseText;
                    }
                };
                xhttp.open("POST", caminho + "servico/cadastro/agenda/agenda_inserir.php", true);
                // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send(formData);

                //console.log("nome=" + nome.value + "&email=" + email.value + "&senha=" + senha.value);
            }

        } else {

            if (endereco.value == "") {
                endereco.focus();
                alerta_endereco.textContent = "Favor informar o endereço!";
            } else if (data.value == "") {
                data.focus();
                alerta_data.textContent = "Favor informar o cargo!";
            } else if (horario.value == "") {
                horario.focus();
                alerta_horario.textContent = "Favor informar a horário!";
            } else if (foto_logo.value == "") {
                foto_logo.focus();
                alerta_imagem.textContent = "Favor informar a imagem!";
            } else {

                // Form Data
                var formData = new FormData();
                formData.set("nome", nome.value);
                formData.set("categoria", categoria.value);
                formData.set("sobre", sobre.value);
                formData.set("local", local.value);
                formData.set("endereco", endereco.value);
                formData.set("data", data.value);
                formData.set("horario", horario.value);

                if (foto_logo != "") {
                    if (foto_logo.files && foto_logo.files.length == 1) {
                        var file = foto_logo.files[0]
                        formData.set("foto_logo", file, file.name);
                    }
                }
                if (foto_logo_secundaria != "") {
                    if (foto_logo_secundaria.files && foto_logo_secundaria.files.length == 1) {
                        var file = foto_logo_secundaria.files[0]
                        formData.set("foto_logo_secundaria", file, file.name);
                    }
                }

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    console.log(this.responseText);
                    if (this.readyState == 4 && this.status == 200) {
                        window.location = caminho + "agenda/agenda_facilitador.php?id=" + this.responseText;
                    }
                };
                xhttp.open("POST", caminho + "servico/cadastro/agenda/agenda_inserir.php", true);
                //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send(formData);
                console.log(formData);
            }
        }
    }
}


function alterar(id) {
    //console.log(id)
    var variaveis = location.search.split("?");
    var id = variaveis[1].split("=");

    var nome = document.getElementById("nome");
    var categoria = document.getElementById("categoria");
    var local = document.getElementById("local");
    var sobre = document.getElementById("sobre");
    var localidade = document.getElementById("localidade");
    var cep = document.getElementById("cep");
    var endereco = document.getElementById("endereco");
    var numero = document.getElementById("numero");
    var bairro = document.getElementById("bairro");
    var cidade = document.getElementById("cidade");
    var estado = document.getElementById("estado");
    var complemento = document.getElementById("complemento");
    var google_maps = document.getElementById("google_maps");
    var data = document.getElementById("data");
    var horario = document.getElementById("horario");
    var foto_logo = document.getElementById("foto_logo");
    var foto_logo_secundaria = document.getElementById("foto_logo_secundaria");

    var alerta_nome = document.getElementById("alerta_nome");
    var alerta_categoria = document.getElementById("alerta_categoria");
    var alerta_sobre = document.getElementById("alerta_sobre");
    var alerta_localidade = document.getElementById("alerta_localidade");
    var alerta_cep = document.getElementById("alerta_cep");
    var alerta_endereco = document.getElementById("alerta_endereco");
    var alerta_numero = document.getElementById("alerta_numero");
    var alerta_bairro = document.getElementById("alerta_bairro");
    var alerta_cidade = document.getElementById("alerta_cidade");
    var alerta_estado = document.getElementById("alerta_estado");
    var alerta_complemento = document.getElementById("alerta_complemento");
    var alerta_google_maps = document.getElementById("alerta_google_maps");
    var alerta_data = document.getElementById("alerta_data");
    var alerta_horario = document.getElementById("alerta_horario");
    var alerta_imagem = document.getElementById("alerta_imagem");
    var alerta_imagem_secundaria = document.getElementById("alerta_imagem_secundaria");


    if (nome.value == "") {
        nome.focus();
        alerta_nome.textContent = "Favor informar o nome!";
    } else if (categoria.value == "") {
        categoria.focus();
        alerta_categoria.textContent = "Favor informar a categoria!";
    } else if (local.value == "") {
        local.focus();
        alerta_local.textContent = "Favor informar o local!";
    } else if (sobre.value == "") {
        sobre.focus();
        alerta_sobre.textContent = "Favor informar sobre o evento!";
    } else {
        if (local.value == "Físico") {
            if (localidade.value == "") {
                localidade.focus();
                alerta_localidade.textContent = "Favor informar a localidade!";
            } else if (cep.value == "") {
                cep.focus();
                alerta_cep.textContent = "Favor informar o cep!";
            } else if (endereco.value == "") {
                endereco.focus();
                alerta_endereco.textContent = "Favor informar o endereço!";
            } else if (numero.value == "") {
                numero.focus();
                alerta_numero.textContent = "Favor informar o número!";
            } else if (bairro.value == "") {
                bairro.focus();
                alerta_bairro.textContent = "Favor informar o bairro!";
            } else if (cidade.value == "") {
                cidade.focus();
                alerta_cidade.textContent = "Favor informar a cidade!";
            } else if (estado.value == "") {
                estado.focus();
                alerta_estado.textContent = "Favor informar o estado!";
            } else if (data.value == "") {
                data.focus();
                alerta_data.textContent = "Favor informar a data!";
            } else if (horario.value == "") {
                horario.focus();
                alerta_horario.textContent = "Favor informar o horário!";
            } else {

                var xhttp = new XMLHttpRequest();

                // Form Data
                var formData = new FormData();
                formData.set("id", id);
                formData.set("nome", nome.value);
                formData.set("categoria", categoria.value);
                formData.set("local", local.value);
                formData.set("sobre", sobre.value);
                formData.set("localidade", localidade.value);
                formData.set("cep", cep.value);
                formData.set("endereco", endereco.value);
                formData.set("numero", numero.value);
                formData.set("complemento", complemento.value);
                formData.set("bairro", bairro.value);
                formData.set("cidade", cidade.value);
                formData.set("estado", estado.value);
                formData.set("google_maps", google_maps.value);
                formData.set("data", data.value);
                formData.set("horario", horario.value);

                if (foto_logo != "") {
                    if (foto_logo.files && foto_logo.files.length == 1) {
                        var file = foto_logo.files[0]
                        formData.set("foto_logo", file, file.name);
                    }
                }
                if (foto_logo_secundaria != "") {
                    if (foto_logo_secundaria.files && foto_logo_secundaria.files.length == 1) {
                        var file = foto_logo_secundaria.files[0]
                        formData.set("foto_logo_secundaria", file, file.name);
                    }
                }

                xhttp.onreadystatechange = function () {
                    console.log(this.responseText);
                    if (this.readyState == 4 && this.status == 200) {
                        window.location = caminho + "agenda/agenda.php?alteracao_agenda=ok";
                    }
                };
                xhttp.open("POST", caminho + "servico/cadastro/agenda/agenda_alterar.php", true);
                // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send(formData);

                //console.log("nome=" + nome.value + "&email=" + email.value + "&senha=" + senha.value);
            }

        } else {

            if (endereco.value == "") {
                endereco.focus();
                alerta_endereco.textContent = "Favor informar o endereço!";
            } else if (data.value == "") {
                data.focus();
                alerta_data.textContent = "Favor informar o cargo!";
            } else if (horario.value == "") {
                horario.focus();
                alerta_horario.textContent = "Favor informar a horário!";
            } else {

                // Form Data
                var formData = new FormData();
                formData.set("id", id);
                formData.set("nome", nome.value);
                formData.set("categoria", categoria.value);
                formData.set("sobre", sobre.value);
                formData.set("local", local.value);
                formData.set("endereco", endereco.value);
                formData.set("data", data.value);
                formData.set("horario", horario.value);

                if (foto_logo != "") {
                    if (foto_logo.files && foto_logo.files.length == 1) {
                        var file = foto_logo.files[0]
                        formData.set("foto_logo", file, file.name);
                    }
                }
                if (foto_logo_secundaria != "") {
                    if (foto_logo_secundaria.files && foto_logo_secundaria.files.length == 1) {
                        var file = foto_logo_secundaria.files[0]
                        formData.set("foto_logo_secundaria", file, file.name);
                    }
                }

                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    console.log(this.responseText);
                    if (this.readyState == 4 && this.status == 200) {
                        window.location = caminho + "agenda/agenda.php?alteracao_agenda=ok";
                    }
                };
                xhttp.open("POST", caminho + "servico/cadastro/agenda/agenda_alterar.php", true);
                //xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp.send(formData);
                //console.log(formData);
            }
        }
    }
}

function verifica_alerta() {
    var variaveis = location.search.split("?");


    if (variaveis[1] != null) {
        if (variaveis[1] == "insercao_agenda=ok") {
            var alerta = document.getElementById("alerta-sucesso");
            var alerta_texto = document.getElementById("alerta-sucesso-texto");
            alerta.style.display = "block";
            alerta_texto.textContent = "Facilitador cadastrado com sucesso!";
        }

        if (variaveis[1] == "exclusao_agenda=ok") {
            var alerta = document.getElementById("alerta-sucesso");
            var alerta_texto = document.getElementById("alerta-sucesso-texto");
            alerta.style.display = "block";
            alerta_texto.textContent = "Agenda excluída com sucesso!";
        }

        if (variaveis[1] == "exclusao_agenda=nao_ok") {
            var alerta = document.getElementById("alerta-sucesso");
            var alerta_texto = document.getElementById("alerta-sucesso-texto");
            alerta.style.display = "block";
            alerta.style.backgroundColor = "red";
            alerta_texto.textContent = "Agenda não pode ser excluído, pois já está vinculado a alguma tabela!";
        }

        if (variaveis[1] == "alteracao_agenda=ok") {
            var alerta = document.getElementById("alerta-sucesso");
            var alerta_texto = document.getElementById("alerta-sucesso-texto");
            alerta.style.display = "block";
            alerta_texto.textContent = "Agenda alterada com sucesso!";
        }
    }
}

function fecha_alerta_sucesso() {
    var alerta = document.getElementById("alerta-sucesso");

    alerta.style.display = "none";
}

function fechar_modal() {
    var sobreposicao = document.getElementById("sobreposicao");
    var modal = document.getElementById("modal");

    sobreposicao.style.display = "none";
    modal.style.display = "none";
}

function confirma_exclusao_usuario(id) {
    var sobreposicao = document.getElementById("sobreposicao");
    var modal = document.getElementById("modal");
    var caixa_mensagem = document.getElementById("caixa-mensagem-mensagem");
    var botao_confirmar = document.getElementById("botao-confirmar");

    sobreposicao.style.display = "block";
    modal.style.display = "block";

    caixa_mensagem.textContent = "Tem certeza que deseja excluir a agenda?";

    botao_confirmar.addEventListener("click", function () {
        modal.style.display = "none";
        sobreposicao.style.display = "none";
        excluir_usuario(id);
    });
}

function excluir_usuario(id) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //console.log(this.responseText);
            if (this.responseText == "OK") {
                window.location = caminho + "agenda/agenda.php?exclusao_agenda=ok";
            } else {
                window.location = caminho + "agenda/agenda.php?exclusao_agenda=nao_ok";
            }
        }
    };

    xhttp.open("POST", caminho + "servico/cadastro/agenda/agenda_exclusao.php", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("id=" + id);
}