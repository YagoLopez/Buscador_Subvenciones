![Status](https://img.shields.io/badge/status-ok-green.svg) ![Maintenance](https://img.shields.io/maintenance/yes/2016.svg?maxAge=2592000) ![License](https://img.shields.io/dub/l/vibe-d.svg?maxAge=2592000)



# Busca Fondos

<p><strong>Buscador de fondos públicos y subvenciones para smartphone.</strong></p>

La aplicación se encarga de recopilar datos de diversos organismos e instituciones y presentarlos de forma homogénea. Además, facilita la consulta de los mismos de una forma centralizada, rápida y eficiente. 

<ul>
<li>
<a href="http://yagolopez.github.io/Buscador_Subvenciones/iframe/iframe.html" target="_blank">
VERSION ONLINE PARA DESKTOP</a>
</li>
<li>
<a href="http://yagolopez.github.io/Buscador_Subvenciones/index.html" target="_blank">
VERSION ONLINE PARA MÓVIL</a>
</li>
</ul>


Los fondos pueden ser de ámbito europeo, nacional, regional o local. La aplicación está particularizada para buscar fondos en el Principado de Asturias aunque también es válida a nivel nacional.

Las fuentes de datos son las siguientes (se podrían añadir más fuentes en el futuro):

- **BOE**: Boletín Oficial del Estado
- **IDEPA**: Institudo para el Desarrollo Económico del Principado de Asturias
- **MINETUR**: Ministerio de Industría, Energía y Turismo
- **DGPYME**: Dirección General de Industria y de la Pequeña y Mediana Empresa
- **BDNS**: Base de Datos Nacional de Subvenciones

<h1>Tecnologías empleadas</h1>

- **Framework 7** (Interfaz de usuario)
- **AngularJS** (Arquitectura MVC y Two way data binding)
- **Apache Cordova/PhoneGap** (Acceso a API de móvil mediante Javascript)
- **Intel Crosswalk Runtime** (Compilación cruzada a Android e IOS)

Probado en:

- Chrome (últimas versiones)
- Microsoft Edge
- Internet Explorer (últimas versiones)
- Android
- IOS (emulador)

Por hacer:

- Búsqueda global (buscar en todos los organismos de una sola vez)
- Añadir organismo: Gobierno de Asturias




# Nota

>
>La obtención de los datos usados en esta aplicación se realiza utilizando servidores de terceras partes. El autor no puede garantizar el correcto funcionamiento de dichos servidores ni, por tanto, la disponibilidad de los datos el 100% del tiempo
>



# Auditoría

<h3>Red: tiempos de carga</h3>

![Red](auditoria/network.png "")
<br/>
<h3>Memoria: actividad del recolector de basura, funciones mas costosas, etc.</h3>

![Memoria](auditoria/timeline.png "")



<p>Los tests unitarios se encuentran en la carpeta `/tests`</p>

<p><a href="#">Volver al principio</a> <b>↑</b></p>