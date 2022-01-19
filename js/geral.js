
 /*
  $( function() {
    $( "#data01" ).datepicker();
  } );	
  $( function() {
    $( "#data02" ).datepicker();
  } );	
    $( function() {
    $( "#data03" ).datepicker();
  } );	
    $( function() {
    $( "#data04" ).datepicker();
  } );	
 */ 

 
function geral_datepicker_ptbr()
{ 
 $.datepicker.regional['pt-BR'] = {
	closeText: 'Fechar',
	prevText: '&lt;Anterior',
	nextText: 'Próximo&gt;',
	currentText: 'Hoje',
	monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
	'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
	monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun',
	'Jul','Ago','Set','Out','Nov','Dez'],
	dayNames: ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sabado'],
	dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
	dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
	weekHeader: 'Sm',
	dateFormat: 'dd/mm/yy',
	firstDay: 0,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: ''};
}

function geral_is_valid_json(str) {
	if ( /^\s*$/.test(str) ) return false;
    str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
    return (/^[\],:{}\s]*$/).test(str);
}

function geral_ajax_json(url, area_msg, mensagem, fn_posexec, assincrono)
{	//console.log(url);
	if (typeof(assincrono) === undefined) {  assincrono = true;}
	console.log('ajax area '+area_msg+ ' : '+url);
	area_msg = this.document.getElementById(area_msg);
    try {
		let objetoxml = geral_ajax_criaXML();
		objetoxml.open("GET", url, assincrono);
		area_msg.innerHTML = mensagem;
		if (fn_posexec == undefined) { fn_posexec = '';}
		objetoxml.onreadystatechange = function(){
			if (objetoxml.readyState == 4){
				area_msg.innerHTML = '';
				let resposta = objetoxml.responseText;
				if (geral_is_valid_json(resposta)){
					fn_posexec(resposta);
				} else {
					console.log(' Json Inválido! |'+resposta+'|');
				}
			} else {  
				area_msg.innerHTML = mensagem + ' (' +objetoxml.readyState+')';
			}
		}
		objetoxml.send(null);
	} catch(err) {
		console.log(err.message); 
		console.log('erro chamando de ' + arguments.callee.caller.toString());
	}	
		   
}

function geral_ajax(url, area, campo_foco, posexec, assincrono, dados_post)
{	//console.log(url);
	if (typeof(assincrono) === undefined) {  assincrono = true;}
    area = this.document.getElementById(area);
    console.log('ajax area '+area+ ' : '+url);
    try
    	{	objetoxml = geral_ajax_criaXML();
    		if (dados_post == undefined) 
    			{	objetoxml.open("GET", url, assincrono); }
    		else {	objetoxml.open("POST", url, assincrono); 
    				objetoxml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    			}
		    area.innerHTML = "<h1>Carregando...</h1>";
		    if (posexec == undefined) { posexec = '';}
		   	objetoxml.onreadystatechange = function()
		      {   if (objetoxml.readyState == 4)
		              {   area.innerHTML = objetoxml.responseText;
		              	//	alert(objetoxml.responseText);
		              	  geral_foco_pos_ajax(campo_foco);
		              	  if (posexec != '') {  
		              	  	//console.log('--'+posexec+'--');
		              	  	eval(posexec);}
		              }
		          else {  area.innerHTML = "<h1>Carregando...</h1>";}
		      }
		    if (dados_post == undefined) 
		   		{	objetoxml.send(null); }
		   	else {	objetoxml.send('dados_json=' + encodeURIComponent(dados_post));}
		 }
	catch(err)
		{ 	console.log(err.message); 
			console.log('erro chamando de ' + arguments.callee.caller.toString());}	
		   
}

function geral_limpar_alert(campo)
{
	
}
function geral_foco_pos_ajax(campo_foco)
{
	if (campo_foco != '')
  	  	{	campo_foco = document.getElementById(campo_foco);
  	  		if (campo_foco != null) { campo_foco.focus();}
  	  	}
}

function geral_ajax_criaXML()
{
    try{ xmlhttp = new XMLHttpRequest();}
    catch(ee){
                try     {   xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
                        //alert("msxml");
                        }
                catch(e){
                            try{xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                        //alert("msxml2");
                               }
                            catch(E){xmlhttp = false;}
                        }
             }
    return xmlhttp;
}

function geral_ajax_define_ws (url, ns, nsName)
{
	var WS = function (url, ns, nsName) 
		{
		    return function (method, parameters, callback) 
		    	{
			        var i, j, para, soapBody = new SOAPObject(method), sr, response;
			        soapBody.ns = 
			        	{
				            name: nsName,
				            uri: ns
			        	};
			        if (typeof parameters === "function") 
			        	{
			            	callback = parameters;
			        	} 
			        else if (parameters && parameters.length) 
			        	{
			            for (i = 0, j = parameters.length; i < j; ++i) 
			            	{
			                para = parameters[i];
			                soapBody.appendChild(new SOAPObject(para.name)).val(para.value);
			            	}
			        	}
			        sr = new SOAPRequest(method, soapBody);
			        SOAPClient.Proxy = url;
			        SOAPClient.SendRequest(sr, function (r) 
			        	{
				            response = r.Body[0][method + "Response"][0]["return"][0]["Text"];
				            if (callback) 
				            	{
				                	callback.call(sr, response);
				            	}
			        	}					);
		    	}
		};
	return WS;
}

function geral_ajax_chama_ws()
{
	//var ws = WS("http://187.93.120.74/mge/service.sbr?serviceName=CRUDServiceProvider.saveRecord", "http://wservices/", "ns2");
	ws = geral_ajax_define_ws("http://187.93.120.74:8180/mge/service.sbr?serviceName=MobileLoginSP", "http://wservices/", "ns2");
	ws("login", [{name: "NOMUSU", value:"LSOARES"},
								{name: "INTERNO", value:"UQZ2X1"}], function (r) {
    				alert(r);
				}
		);
	alert('executado');
}

function geral_checkbox_sim_nao(name)
{
	var el = document.getElementById(name);
	if (el)
		{	if (el.checked)
				{	return 'S'; }
			else {	return 'N'; }
		}	
}

function geral_radio_checked(name)
{
	if (document.getElementById(name))
		{
			elements = document.getElementsByName(name);

			len=elements.length;
    		for (i=0; i<len; ++i)
        		if (elements[i].checked) return elements[i].value;
       }
    else { return '';}
}

function geral_radio_mark_checked(name, value)
{
	if (document.getElementById(name))
		{
			elements = document.getElementsByName(name);

			len=elements.length;
    		for (i=0; i<len; ++i)
    			{	if (elements[i].value == value) 
        				{	elements[i].checked = true; }
        			else {  elements[i].checked = false; }
        		}
       }
    else { console.log('radio name '+name+' nao encontrado');}
}

function geral_combo_update_campo(origem, destino, camponome, posexec)
{	
	if ((origem != '') && (destino != ""))
		{
			console.log('  origem.value '+origem.value);
			baseorigem = origem;
			console.log(' combo_update_campo origem '+origem+'  destino'+destino+' camponome'+camponome+'  posexec '+posexec);	
			
			origem = document.getElementById(origem);
			console.log('  origem.value '+origem.value);
			document.getElementById(destino).value = origem.value;
			//alert("|"+typeof(camponome)+"|");
			if ((!(typeof(camponome) === "undefined")) && (camponome != ""))
				{	console.log('inner html do camponome');
					if (destino != 'txtcodtabdesc')
						{	document.getElementById(camponome).innerHTML = origem.options[origem.selectedIndex].text; }
					//else {	document.getElementById(txtcodtabdesc).value = origem.options[origem.selectedIndex].text;}
				}
			if (!(typeof(posexec) === "undefined"))
				{	eval(posexec);
				}	
			geral_form_enable_button_save();
			if (baseorigem == 'cmb_codtabdesc')
				{	geral_verifica_combodesconto();}
			if (document.getElementById('td_listbox_promo'))
				{	if ((destino == 'txtcodparc2') || (destino == 'txtcodvend2') || (destino == 'txtcodtipoper'))
						{
							console.log('disparar atualizacao do listbox de promocoes');
							fatura_atualiza_listbox_promo();
						}
				}				
		}
}


function geral_combo_dinamico(campo, e, posexec)
{
	objcampo = document.getElementById('txtnome'+campo);
	if (!objcampo.readOnly) 
		{ 
			if (e.keyCode == 13)
				{
					area = 'span_nome'+campo;
					valor = document.getElementById('txtnome'+campo).value;
					document.getElementById('span_nome'+campo+'_temp').className = 'display_normal';
					url = "../fatura/fatura.php?fnajax=geral_form_combo_dinamico&campo="+campo+"&valor="+valor;
					if (geral_is_url_mrp())
						{	url = '../'+url; }					
					url += "&codorig="+document.getElementById('txtcod'+campo).value;
					url += "&nomeorig="+document.getElementById('span_nome'+campo+'_temp').innerHTML;
					url += "&posexec="+posexec;
					if (document.getElementById('codvend_padrao'))
						{	url += "&codvendpadrao="+document.getElementById('codvend_padrao').value;
						}
					else {	url += "&codvendpadrao=0";}
					posexec_vrf_unico = "geral_combo_dinamico_verifica_retorno_unico('"+campo+"');";
					geral_ajax(url, area, '', posexec_vrf_unico);
					if (document.getElementById('td_listbox_promo'))
						{	if ((campo == 'parc2'))
								{
									console.log('disparar atualizacao do listbox depromocoes');
									fatura_atualiza_listbox_promo();
								}
							
						}
				}	
	}
}

function geral_combo_dinamico_verifica_retorno_unico(campo)
{	console.log(campo+", verficiar unico");
	if (document.getElementById('cmb_'+campo))
		{	combo = document.getElementById('cmb_'+campo);
			console.log(combo.length+", "+combo.options[0].value+", "+combo.options[0].text);
			document.getElementById('txtcod'+campo).value = combo.value;
			document.getElementById('txtnome'+campo).value = combo.options[0].text;
			//console.log(posexec_finalizar);
			if (document.getElementById('span_nome'+campo+'_temp'))
						{	document.getElementById('span_nome'+campo+'_temp').innerHTML = combo.options[0].text; }
			if (combo.options.length == 1)
				{	if (document.getElementById('span_nome'+campo))
						{	document.getElementById('span_nome'+campo).innerHTML = ''; }
					if (document.getElementById('span_nome'+campo+'_temp'))
						{	document.getElementById('span_nome'+campo+'_temp').innerHTML = ''; }
					if (document.getElementById('chk'+campo))
						{	document.getElementById('chk'+campo).checked = true;
							$("#chk"+campo).change();
						}
				}
			else {	document.getElementById('cmb_'+campo).focus();
					document.getElementById('cmb_'+campo).onkeyup = function (event) {
																		geral_combo_dinamico_presskey(campo, event);
																} ;
				}
		}
}

function geral_combo_dinamico_presskey(campo, e)
{	
	if (e.keyCode == 13)
		{
			if (document.getElementById('btn_ok_'+campo))
				{	$("#btn_ok_"+campo).click();
				}
		}
}

function geral_combo_dinamico_confirmar(campo, posexec)
{
	document.getElementById('txtnome'+campo).value = document.getElementById('span_nome'+campo+'_temp').innerHTML;
	document.getElementById('span_nome'+campo+'_temp').className = 'display_hidden';
	document.getElementById('span_nome'+campo).innerHTML = '';
	if (document.getElementById('chk'+campo))
		{	document.getElementById('chk'+campo).checked = false;
			document.getElementById('chk'+campo).checked = true;
		}
	$("#txtcod"+campo).toggle("highlight", 250);
	$("#txtcod"+campo).toggle("highlight", 125);
	geral_form_enable_button_save();
	console.log(posexec);
	
	if ((posexec != '') && (posexec != "undefined"))
		{	eval(posexec);
		}
	if (campo == 'parc2')
		{	if (document.getElementById('span_credito'))
				{	url = '../fatura/fatura.php?fnajax=fatura_ctrprod_formata_txtcredito_cliente';
					if (geral_is_url_mrp())
						{	url = '../'+url; }				
					url += "&codparc="+document.getElementById('txtcod'+campo).value;
					geral_ajax(url, 'span_credito', '', '', false);	
				}
			if (document.getElementById('td_listbox_promo'))
				{	
					console.log('disparar atualizacao do listbox depromocoes');
					fatura_atualiza_listbox_promo();
				}
		}
}



function geral_combo_dinamico_cancelar(campo, codorig, nomeorig)
{
	document.getElementById('txtcod'+campo).value = codorig;
	document.getElementById('txtnome'+campo).value = nomeorig;
	document.getElementById('span_nome'+campo+'_temp').innerHTML = nomeorig;
	document.getElementById('span_nome'+campo+'_temp').className = 'display_hidden';
	document.getElementById('span_nome'+campo).innerHTML = '';
	$("#txtnome"+campo).toggle("highlight", 250);
	$("#txtnome"+campo).toggle("highlight", 125);
	geral_form_enable_button_save();
}

function geral_form_texto_atualiza_combo(campoedit, campocombo)
{	//preservar o valor atual do combo
	
	el_combo = document.getElementById(campocombo);
	el_edit = document.getElementById(campoedit);  
	original = el_combo.value;
	novo = el_edit.value;
	//se o valor do edit existe no combo, atualiza
	//senão retorna o edit para o valor que está no combo
	found = false;
	for (i=0; i < el_combo.options.length; i++)
		{	if (el_combo.options[i].value == novo)
				{	found = true;
					i = el_combo.options.length;
				}
		}
	if (found)
		{	el_combo.value = novo;
			result = 'ok';	
		}
	else {	el_edit.value = original;
			result = 'fail';	
		}
	geral_toggle_campos(campoedit, campocombo, result);
	geral_form_enable_button_save();
	console.log('campoedit '+campoedit + ' '+campocombo);
	if (document.getElementById('td_listbox_promo') && ((campoedit == 'txtcodvend2') || (campoedit == 'txtcodtipoper')))
				{	
					console.log('disparar atualizacao do listbox depromocoes');
					fatura_atualiza_listbox_promo();
				}
}

function geral_toggle_campos(campoedit, campocombo, tipo, duration)
{
	if (!(typeof(duration) === "undefined"))
		{	duration = 0.5;}
		
	codcor = (tipo == 'ok') ? '#00ff00' : '#ff030d';
	$("#"+campocombo).toggle("highlight", {color: codcor},  400*duration);
	$("#"+campocombo).toggle("highlight", 100*duration);
	$("#"+campoedit).toggle("highlight", {color: codcor}, 400*duration);
	$("#"+campoedit).toggle("highlight", 100*duration);
}

function geral_toggle_linha_tabela_verde(objLinha, tempo)
{
	if (!(typeof(duration) === "undefined"))
		{	tempo = 0.5;}
		
	codcor = '#00ff00' ;
	sequencia = objLinha.cells[0].innerHTML;
	for (i=0; i <= objLinha.cells.length-1; i++)
		{	idcell = 'temp_toggle_'+i+'_'+sequencia; 
			objLinha.cells[i].id = idcell;
			$("#"+idcell).toggle("highlight", {color: codcor},  1000*tempo);
		}
	for (i=0; i <= objLinha.cells.length-1; i++)
		{	idcell = 'temp_toggle_'+i+'_'+sequencia; 
			$("#"+idcell).toggle("highlight", 1000*(tempo/2)); }
	//("#"+id_linha).toggle("highlight", {color: codcor},  400*duration);		
}

function geral_form_texto_atualiza_nome_por_codigo(campocod, camponome, tipofiltro)
{
	if (geral_is_int(document.getElementById(campocod).value))
		{
			url = "../fatura/fatura.php?fnajax=geral_pesquisa_nome_por_codigo&cod="+document.getElementById(campocod).value;
			if (geral_is_url_mrp())
				{	url = '../'+url; }			
			//url = "fatura.php?fnajax=geral_form_combo_dinamico&campo="+campo+"&valor="+valor;
			url += "&tipo="+tipofiltro;
			area = "span_nome"+campocod.substr(6, 20)+"_temp";
			console.log(area);
			geral_ajax(url, area, '', '', false);	
			//alert(document.getElementById(area).innerHTML);
			document.getElementById(camponome).value = document.getElementById(area).innerHTML;
			result = "ok";
			chk = "chk"+campocod.substr(6, 20);
			if (document.getElementById(area).innerHTML == "") 
				{	result = 'fail';
					document.getElementById(campocod).value = "";
					if (document.getElementById(chk))
						{	document.getElementById(chk).checked = true;
							document.getElementById(chk).checked = false;
						}
				}
			else {	if (document.getElementById(area).innerHTML.length < 100)
						{	document.getElementById(area).innerHTML = ""; }
					if (document.getElementById(chk))
						{	document.getElementById(chk).checked = false;
							document.getElementById(chk).checked = true;
						}
					if (tipofiltro == 'cliente')
						{	if (document.getElementById('span_credito'))
								{	url = '../fatura/fatura.php?fnajax=fatura_ctrprod_formata_txtcredito_cliente';
									if (geral_is_url_mrp())
										{	url = '../'+url; }									
									url += "&codparc="+document.getElementById(campocod).value;
									geral_ajax(url, 'span_credito', '', '', false);	
								}
							
						}
				}
			geral_toggle_campos(campocod, camponome, result);
			geral_form_enable_button_save();
			if (document.getElementById('td_listbox_promo'))
				{	if ((tipofiltro == 'cliente') || (tipofiltro == 'vendedor'))
						{
							console.log('disparar atualizacao do listbox depromocoes');
							fatura_atualiza_listbox_promo();
						}
					
				}

		}
	else {	document.getElementById(campocod).value = "";
		}
}

function geral_form_texto_pesquisa_codigo_por_nome(e, tipo)
{
	area = 'span_nome'+tipo+"_temp";
		
}

function geral_form_enable_button_save()
{
	if (document.getElementById('button-confirm'))
		{	document.getElementById('button-confirm').className = "display_hidden"; }
	if (document.getElementById('button-faturar410'))
		{	document.getElementById('button-faturar410').className = "display_hidden"; }
	if (document.getElementById('button-save'))
		{	document.getElementById('button-save').className = document.getElementById('button-cancel').className; 
			geral_toggle_campos('button-cancel', 'button-save', 'ok', 0.25);
		}	
}

function geral_calendario(name)
{	//alert(name);
	$(name).calendario({
        target : name,
        dateDefault:$(name).val()
    });
}

function geral_calendario_jui(name)
{	//alert(name);
  $( function() {
    $( name ).datepicker();
  } );
}

function geral_carrega_js_datepicker(name)
{
	name = '#'+name;
  $( function() {
    $( name ).datepicker();
  } );	
  //console.log(name);
  $( name ).datepicker();
  /*
     $( function() {
    $( "#datepicker" ).datepicker();
  } );
   */
}

function geral_menu_habilita(opcao)
{
	//dentro da tabela de id = menu
	//	em todas as linhas,
	//	mudar todas as celulas para class btn_not_selected
	//	e mudar a opcao selecionada btn_selected
	linhas = document.getElementById('menu').rows;
	for (i=0; i < linhas.length; i++)
		{
			cels = linhas[i].cells;
			for (j=0; j < cels.length; j++)
				{	cels[j].className = 'btn_not_selected'; }
		} 
	document.getElementById(opcao).className = 'btn_selected';
}

function geral_combo_select_by_value(elemento, valor) 
{
    var opt = elemento.options;
    for ( i = 0; i < opt.length; i++) {
        if (opt[i].value == valor) {
            elemento.selectedIndex = i;
            return true;
        }
    }
    return false;
}

function geral_is_int(value)
{	tmp =true;
   for (i = 0 ; i < value.length ; i++) 
   {
      if ((value.charAt(i) < '0') || (value.charAt(i) > '9')) { tmp = false; }
    }
   return tmp;
}

function geral_tabela_zebrar(tabela, negrito)
{
	console.log('zebrar tabela '+tabela);
	if (document.getElementById(tabela))
		{
			lns = document.getElementById(tabela).rows;
			for (i=1; i < lns.length; i++)
				{	classe = ((i-1) % 2) ? "fundo_cinza_leve" : " ";
					
					cs = lns[i].cells;
					if (tabela == 'tabela_itens')
						{	console.log('coluna 6: '+cs[6].innerHTML);
							if (parseFloat(cs[6].innerHTML) == 0)
								{	classe =  "\"fundo_tomato font_negrito\"" ;}
							if (cs[0].className.substr(0, 12) == 'fundo_tomato')
										{	classe = cs[0].className; }
						}
					else {  if (tabela == 'tab_listapedidos')
								{	if (cs[0].className.substr(0, 12) == 'fundo_tomato')
										{	classe = cs[0].className; }
									console.log(cs[0].className+':'+cs[0].className.substr(0, 12));
								}
						}
					for (j=0; j < cs.length; j++)
						{	cs[j].className = classe;
						}
				}
		}
}

function geral_tabela_cabecalho_flutuante(tabela, indcab, inddata)
{
	//ajustar a largura de colunas em tabelas de cabecalho fixo
	//em que foi usado theader e overflow auto para os dados
	console.log('formatar cab flutuante tabela '+tabela);
	ht = $(window).height(); 
	if (document.getElementById(tabela+'_body'))
		{
			top_header = document.getElementById(tabela+'_body').getBoundingClientRect().top;
			//console.log('topheader '+top_header);
			
			$('#'+tabela+'_body').height(ht-top_header-10);
			console.log('ht widnows '+ht+',  top body '+(ht-top_header-10));
				
			lns = document.getElementById(tabela).rows;
			if (inddata <= lns.length-1)
				{			
					ln_head = lns[indcab];
					ln_data = lns[inddata];
					
					//console.log('head '+indcab+' '+ln_head.cells[0].innerHTML);
			
					//console.log('data '+inddata+' '+ln_data.cells[0].innerHTML);
					for (j=0; j < ln_head.cells.length; j++)
						{	ln_head.cells[j].id = 'whead'+tabela+j;
							if (ln_data.cells[j])
								{	ln_data.cells[j].id = 'wdata'+tabela+j; }
				
							whead = $('#whead'+tabela+j).width();
							wdata = $('#wdata'+tabela+j).width();
						
							//console.log('c'+j+', whead '+whead+' wdata '+wdata);
							if (j == (ln_head.cells.length-1))
								{ whead -= 16;}
							if (whead > wdata)
								{	$('#wdata'+tabela+j).width(whead); }
							else {	$('#whead'+tabela+j).width(wdata); 
									if (j == (ln_head.cells.length-1))
										{	whead = $('#whead'+tabela+j).width();
											$('#whead'+tabela+j).width(whead+16);
										}			
									}
				
				
							whead = $('#whead'+tabela+j).width();
							wdata = $('#wdata'+tabela+j).width();
							
							//console.log('novo c'+j+', whead '+whead+' wdata '+wdata);			
							
							//document.getElementById('div_vhc').style.width= myvalue.offsetWidth+'px';
						}
				}
		}
	else {  console.log('elemento '+tabela+'_body não encontrado');
			if (document.getElementById(tabela))
				{ 	if (tabela == 'tab_listapedidos')
						{	tabela = 'area_cabpedidos'; }
					top_header = document.getElementById(tabela).getBoundingClientRect().top;
					console.log('topheader '+top_header);
					
					$('#'+tabela).height(ht-top_header-20);
					httab = $('#'+tabela).height();
					console.log('sem body: ht widnows '+ht+':'+httab+',  top body '+(ht-top_header-20));
				}	
	
		}
	if (document.getElementById('area_html_temp'))
		{	document.getElementById('area_html_temp').innerHTML = ''; }
}

function geral_print_report_simples(idreport, params, filename)
{
	jpar = JSON.stringify(params);
	endereco = document.location.href;
	posicao = endereco.indexOf('?');
	modulo = endereco.substring(0, posicao);
	
    //link = modulo+'?fnajax=geral_jasper_report&id_report='+idreport;
	link = 'http://200.187.87.234:8081/sankhya/lojas/lojas.php?fnajax=geral_jasper_report&id_report='+idreport;
    if (params != '')
    	{	link += '&jpar='+jpar; }
    else {	link += '&jpar={}'; }
    if (filename)
    	{	link += "&filename=\""+filename+"\"";}
    	console.log(link);
    var win = window.open(link, 'PrintReport');
	if (win) {
	    //Browser has allowed it to be opened
	    win.focus();
	} else {
	    //Browser has blocked it
	    alert('Necessário habilitar janelas popup');
	}
	
}

function geral_json_decode_chars(json_object)
{
	//iterar sobre as chaves de um json key->value 
	//e aplicar a função de htmldecode para desconverter os chacters
	//deve continuar sendo um json válido?
	Object.keys(json_object).forEach(function(key)
		{	if ((typeof json_object[key]) == 'string')
				{	json_object[key] = Encoder.htmlDecode(json_object[key]); }
   			//console.log(key + '=' + obj[key]);
		}
									);
	return json_object;
	
}

function geral_date_object_from_data_pt(valor)
{	ano = parseInt(valor.substr(6, 4));
	mes = parseInt(valor.substr(3, 2))-1;
	dia = parseInt(valor.substr(0, 2));
	data = new Date(ano, mes, dia);
	return data;
}

function geral_so_numeros(valor)
{
	valor = valor.replace(/[^0-9]/g, "");
	return valor;
}

function geral_sleep(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}

function geral_posiciona_fim_loop(area_controle)
{	//inclui uma área de controle com um checkbox
	//posiciona o foco no checkbox e depois excluir o elemento
	text_html = area_controle.innerHTML;
	area_controle.innerHTML = "<input type=checkbox id=\"chk_controle_fim_loop\">"+text_html;
	document.getElementById('chk_controle_fim_loop').focus();
	area_controle.innerHTML = text_html;
	
}

function geral_prevtempo_loop(dhstart_real, dhstart, processados, total_processar, max_processar)
{	//recebe dois dhstart tipo date (dh real e dhstart) e inteiros de processados e total_processar
	//em geral total_processar = max_processar,
	//		mas podem ser diferentes se estiver executando somente parte do loop
	//				(loop encerra no max_processar se este for menor que total_processar)
	//calcula os tempos e passos e devolve uma string com tags P para exibição
	var texto = '';
	
	if (total_processar > 0)
		{	if (processados == 0)
				{	texto = '<p align=center>Início: '+geral_DateTime_toString(dhstart_real, false, false, false, false, true, true)+'</p>';
					texto += '<p align=center>Itens a Processar: '+total_processar+'</p>';
				}
			else {	var dh_atual = new Date();
					passou = dh_atual.getTime() - dhstart;
				    media = passou/processados;
				    proc_faltam = total_processar - processados;
				    prev_tempo_falta = media*proc_faltam;
				    console.log('processados '+processados+'/'+total_processar+' faltam '+proc_faltam);
				    console.log(passou);
					console.log('passou '+passou+ ' media: '+media+'  prev_tempo_falta '+prev_tempo_falta);
					dhprev = new Date();
					dhprev.setTime(dhprev.getTime() + prev_tempo_falta);
					
					passou = geral_converte_milisecs_to_string(passou, 1);
					media = geral_converte_milisecs_to_string(media, 1);
					prev_tempo_falta = geral_converte_milisecs_to_string(prev_tempo_falta, 1);
				
					if (processados < max_processar)
						{	texto = '<div class=progress>';
							pg_width = (processados/max_processar*100).toFixed(0);
							texto += '<div class="progress-bar progress-bar-striped progress-bar-animated bg-success font_negrito" style="width:'+pg_width+'%">'+pg_width+'%</div> ';
							texto += '</div>';
							texto += '<p align=center>Início: '+geral_DateTime_toString(dhstart_real, false, false, false, false, true, true)+'</p>';
							texto += '<p align=center>processados: '+processados+'/'+total_processar+',  faltam: '+proc_faltam + '</p>';	
							texto += '<p align=center>passou: '+passou+ ', média: '+media+', tempo restante: '+prev_tempo_falta+'</p>';
							texto += '<p align=center>Previsão Término: '+geral_DateTime_toString(dhprev, false, false, false, false, true, true)+'</p>';
						}
					else {	texto = '<p align=center>Início: '+geral_DateTime_toString(dhstart_real, false, false, false, false, true, true)+'</p>';
							if (processados < total_processar)
								{	texto += '<p align=center>processados: '+processados+'/'+total_processar+'</p>'; }	
							texto += '<p align=center>passou: '+passou+ ', média: '+media+'</p>';
							texto += '<p align=center>Conclusão: '+geral_DateTime_toString(geral_getRealTime(), false, false, false, false, true, true)+'</p>';
						}
				}
		}
	return texto;
}

function geral_converte_milisecs_to_string(valor, precisao)
{	valor = valor/1000;
	var str = '';
	var hrs = '';
	if (valor < 60)
		{	str = valor.toFixed(precisao)+'s'; }
	else {	if (valor >= 60*60)
				{	hrs = geral_leading_zero(Math.floor(valor/60/60))+'h';
					valor = valor - Math.floor(valor/60/60)*60*60;
				}
			if (valor < 60*60)
				{	min = geral_leading_zero(Math.floor(valor/60));
					console.log('valor: '+valor+'  floor(v/60): '+Math.floor(valor/60));
					sec = geral_leading_zero(Math.floor(valor - Math.floor(valor/60)*60));
				}
			str = hrs+min+"m"+sec+'s';
		}
	return str;
}

function geral_getRealTime()
{
	url =  "http://"+window.location.host+"/sankhya/datetime_server.php";
	geral_ajax(url, 'area_get_real_time', '', '', false);
	real_dh = document.getElementById('area_get_real_time').innerHTML;
	//result = JSON.parse(result_string);
	//real_dh = result.datetime;
	console.log(real_dh); 
	real_date_time = new Date(real_dh);
	//2020-02-17 04:41:51
	//var hora = real_dh.substr(11, 2);
	//real_date_time.setHours(hora);
	//console.log(real_date_time);
	//console.log(geral_DateTime_toString(real_date_time, true, true, true, true, true, true));
	//Date(ano, mês, dia, hora, minuto, segundo, milissegundo)
	//exit;
	return real_date_time;
	
}

function geral_DateTime_toString(datetime, with_dm, with_mf, with_year, with_dw, with_hm, with_sec)
{	
	var str = '';
	if (with_dm)
		{	if (with_dw)
				{	weekdays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
					str = weekdays[datetime.getDay()]+', ';
				}
			str += geral_leading_zero(datetime.getDate());
			
			if (with_mf)
				{	months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
					str += ' de '+months[datetime.getMonth()]; 
				}
			else {	str += '/'+geral_leading_zero(datetime.getMonth()+1);
				}
			if (with_year)
				{	str += with_mf ? ' de ' : '/';
					str += datetime.getFullYear();
				}			
		}
	if (with_hm)
		{	if (str != '') { str += ', ';}
			str += geral_leading_zero(datetime.getHours()) + ':';
			str += geral_leading_zero(datetime.getMinutes());	
			if (with_sec)
				{	str += ':'+geral_leading_zero(datetime.getSeconds());
				}					
		}

	return str;
}

function geral_leading_zero(valor)
{	if (valor >= 10)
		{	return valor; }
	else {	leading = new String('0');
			return leading.concat(valor);
		}
}

function geral_mdb_table_scroll_xy(id_table, v_minheight, v_ordering)
{	console.log('chamar table_scroll');

	$('#'+id_table).DataTable({
			"paging": false,
			"searching": false,
			"info": false,
			"scrollX": true,
			"ordering": v_ordering,
			"scrollY": v_minheight,
			scroller: true,
		});
	$('.dataTables_length').addClass('bs-select');
	$('#'+id_table).DataTable().columns.adjust();
	console.log('fim table scroll');
}

function geral_form_get_multiple_select(campo)
{
	if (document.getElementById(campo))
		{
			select = document.getElementById(campo);
			var result = [];
			var options = select.options;
			var opt;
			
			for (var i=0, iLen=options.length; i<iLen; i++) 
				{
			    	opt = options[i];
			
			    	if (opt.selected) {
			      		result.push(opt.value);
			    		}
			  	}
			return result;
		}
}

function geral_is_url_projeto()
{
	var url = location.href;
	is_projeto = url.includes('sankhya_projeto');
	return is_projeto;
}