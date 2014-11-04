var casa_selecionada = null;
var peca_selecionada = null;
var first = 1;

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("cavaloId", ev.target.id);
}

function drop(ev) {
	ev.preventDefault();
	var data = ev.dataTransfer.getData("cavaloId");
	ev.target.appendChild(document.getElementById(data));
}

function start() {
	$(".casa").hover(
			function() {
				$("#" + casa_selecionada).removeClass("casa_selecionada");
				casa_selecionada = $(this).attr("id");
				$("#" + casa_selecionada).addClass("casa_selecionada");
				$("#info_casa_selecionada").text(casa_selecionada);
				peca_selecionada = $("#" + casa_selecionada).children(
						"img:first").attr("id");
				if (peca_selecionada == null) {
					peca_selecionada = "NENHUMA PECA SELECIONADA";
				}
				$("#info_peca_selecionada").text(peca_selecionada.toString());
			});
	$(".casa")
			.click(
					function() {
						var nome_casa = $(this).attr("id");
						if ($("#" + nome_casa).children().length == 0) {
							if (first === 1) {
								$("#" + nome_casa).append(
										"<img src='assets/cavalobranco.png' class='peca' id='"
												+ nome_casa.replace("casa",
														"peca_branca")
												+ "' draggable='true' "
												+ ' ondragstart="drag(event)" '
												+ "/>");
								first = 2;
							} else if (first === 2) {
								$("#" + nome_casa).append(
										"<img src='assets/cavalopreto.png' class='peca' id='"
												+ nome_casa.replace("casa",
														"peca_preta")
												+ "' draggable='true' "
												+ ' ondragstart="drag(event)" '
												+ "/>");
								first = 0;
							}
						}
					});
};
function MontarTabuleiro() {
	var i;
	num_linhas = 10;
	num_colunas = 10;
	for (i = 0; i < num_linhas; i++) {
		$("#tabuleiro").append(
				"<div id='linha_" + i.toString() + "' class='linha' >");
		for (j = 0; j < num_colunas; j++) {
			var nome_casa = "casa_" + i.toString() + "_" + j.toString();
			var classe = (i % 2 == 0 ? (j % 2 == 0 ? "casa_branca"
					: "casa_preta") : (j % 2 != 0 ? "casa_branca"
					: "casa_preta"));
			$("#linha_" + i.toString()).append(
					"<div id='" + nome_casa + "' class='casa " + classe
							+ "' />");
		}
	}
};
