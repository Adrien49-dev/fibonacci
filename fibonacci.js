// à la jQuery
function $(id) {
	return window.document.getElementById(id);
}

function calculer() {
	var n = parseInt($("n").value);
	var u0 = parseFloat($("u0").value);
	var u1 = parseFloat($("u1").value);
	var un = $("un");
	var s = parseFloat(0);
	var sn = $("sn");
	var fenetre = $("fenetre");
	if (isNaN(n) || isNaN(u0) || isNaN(u1) || n < 0 || n > 20) {
		alert("Données invalides");
		un.value = "";
		sn.value = "";
		fenetre.value = "";
		if (parent.hasChildNodes())
			parent.removeChild(grandeTable);
		return;
	}
	var u = [ u0, u1 ];

	s = 0;
	fenetre.value = "";
	fenetre.value += u[0] + " ";
	s += u[0];
	fenetre.value += u[1] + " ";
	if (n >= 1)
		s += u[1];
	for (var i = 2; i <= n; i++) {
		u[i] = u[i - 1] + u[i - 2];
		fenetre.value += u[i] + " ";
		s += u[i];
	}
	un.value = u[n];
	sn.value = s;

	/* Construction d'un histogramme : une grande table avec une seul ligne */
	var parent = $("ici");
	// alert(parent.hasChildNodes());
	if (parent.hasChildNodes()) {
		var grandeTable = $("grandeTable");
		parent.removeChild(grandeTable);
	}

	var grandeTable = window.document.createElement("table");
	grandeTable.id = "grandeTable";

	var trG = window.document.createElement("tr");
	grandeTable.appendChild(trG);
	parent.appendChild(grandeTable);

	for (i = 0; i <= n; i++) {
		var td = window.document.createElement("td");
		td.setAttribute("class", "celluleGrandeTable");
		trG.appendChild(td);
		var table = window.document.createElement("table");
		td.appendChild(table);
		/*
		 * chaque petite table a 3 lignes : la valeur du terme, la barre de
		 * l'histogramme et le nom du terme
		 */
		/* Première ligne : écriture de la valeur du terme */
		var tr = window.document.createElement("tr");
		table.appendChild(tr);
		td = window.document.createElement("td");
		td.innerHTML = u[i];
		td.className = "valeur";
		tr.appendChild(td);
		/* Seconde ligne : dessin de la barre de l'histogramme */
		tr = window.document.createElement("tr");
		table.appendChild(tr);
		td = window.document.createElement("td");
		td.className = "histo";
		td.style.height = u[i] + "px";
		tr.appendChild(td);
		/* Troisième ligne : nom du terme */
		tr = window.document.createElement("tr");
		table.appendChild(tr);
		td = window.document.createElement("td");
		td.innerHTML = "<em>u</em><sub>" + i + "</sub>";
		td.className = "terme";
		tr.appendChild(td);
	}
}
