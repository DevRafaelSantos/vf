function AbreMenu()
{
	var menu = document.getElementById('menu');
	var link_menu_icone = document.getElementById('link-menu-icone');
	menu.style.display = "block";
	link_menu_icone.href = "javascript: FechaMenu()";
}

function FechaMenu()
{
	var menu = document.getElementById('menu');
	var link_menu_icone = document.getElementById('link-menu-icone');
	menu.style.display = "none";
	link_menu_icone.href = "javascript: AbreMenu()";
}