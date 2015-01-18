# PWS Tabs jQuery Plugin

Version 1.1.2

PWS Tabs is a lightweight jQuery tabs plugin to create flat style tabbed content panels with some cool transition effects powered by CSS3 animations.

All you need to do is add few divs for your tabs, and script will generate Tabs for you.

## Demo

Online demo: http://alexchizhov.com/pwstabs


## Documentation

### Getting Started

1) Include jQuery library and jQuery PWS Tabs plugin in the <strong>&lt;head&gt;</strong> section.

<pre><code>&lt;script src="//code.jquery.com/jquery-1.11.2.min.js"&gt;&lt;/script&gt;

&lt;link type="text/css" rel="stylesheet" href="jquery.pwstabs.css"&gt;
&lt;script src="jquery.pwstabs-1.1.0.js"&gt;&lt;/script&gt;</code></pre>

2) Create tabbed panels and use Html5 <code>data-pws-*</code> attributes to specify the ID & Name for the tabs.

<pre><code>&lt;div class="hello_world"&gt;

   &lt;div data-pws-tab="anynameyouwant1" data-pws-tab-name="Tab Title 1"&gt;Our first tab&lt;/div&gt;
   &lt;div data-pws-tab="anynameyouwant2" data-pws-tab-name="Tab Title 2"&gt;Our second tab&lt;/div&gt;
   &lt;div data-pws-tab="anynameyouwant3" data-pws-tab-name="Tab Title 3"&gt;Our third tab&lt;/div&gt;

&lt;/div&gt;</code></pre>


<strong><code>data-pws-tab</code></strong> is used to initiate the tab and as its ID.

<strong><code>data-pws-tab-name</code></strong> is used for a tab display name.


3) Call the plugin on the parent element to create a basic tabs interface with 100% width and 'scale' transition effect.
<pre><code>jQuery(document).ready(function($){
   $('.hello_world').pwstabs();        
});</code></pre>


4) Available parameters to customize the tabs plugin.
<pre><code>jQuery(document).ready(function($){
   $('.hello_world').pwstabs({

      // scale, slideleft, slideright, slidetop, slidedown
      effect: 'scale', 
 
      // The tab to be opened by default
      defaultTab: 1,    
 
      // Set custom container width
      // Any size value (1,2,3.. / px,pt,em,%,cm..)
      containerWidth: '100%',

      // Tabs position: horizontal / vertical
      tabsPosition: 'horizontal',
 
      // Tabs horizontal position: top / bottom
      horizontalPosition: 'top',

      // Tabs vertical position: left / right
      verticalPosition: 'left',
 
      // Right to left support: true/ false
      rtl: false

   });        
});</code></pre>



## Options

<table>
<thead>
<tr>
<th>Option</th>
<th>Default</th>
<th>Description</th>
<th>Available options</th>
<th>Type</th>
</tr>
</thead>
<tbody>
<tr>
<td>effect</td>
<td>scale</td>
<td>Transition effect</td>
<td>scale / slideleft / slideright / slidetop / slidedown</td>
<td>string</td>
</tr>
<tr>
<td>defaultTab</td>
<td>1</td>
<td>Which tab is chosen by default</td>
<td>Tab ID number starts with 1 (1,2,3..)</td>
<td>string</td>
</tr>
<tr>
<td>containerWidth</td>
<td>100%</td>
<td>Tabs container width</td>
<td>Any size value (1,2,3.. / px,pt,em,%,cm..)</td>
<td>number</td>
</tr>
<tr>
<td>tabsPosition</td>
<td>horizontal</td>
<td>Define tabs position</td>
<td>horizontal / vertical</td>
<td>string</td>
</tr>
<tr>
<td>horizontalPosition</td>
<td>top</td>
<td>Horizontal position of Tabs controlls</td>
<td>top / bottom</td>
<td>string</td>
</tr>
<tr>
<td>verticalPosition</td>
<td>left</td>
<td>Define Vertical tabs position</td>
<td>left / right</td>
<td>string</td>
</tr>
<tr>
<td>rtl</td>
<td>false</td>
<td>Right to left support</td>
<td>true / false</td>
<td>boolean</td>
</tr>
</tbody>
</table>


## Changelog

### Version 1.1.3 (18.01.2015)
1) Added tabsPosition settings: horizontal / vertical.<br>
2) Added verticalPosition settings: left / right.<br>
3) Updated stylesheets.<br>
4) Updated examples.

### Version 1.1.2 (17.01.2015)
1) Added RTL support.<br>
2) Added horizontalPosition settings: top / bottom.<br>
3) New examples with video, Google Maps and mixed content.

### Version 1.1.1 (16.01.2015)
1) Bug fix: added class selector to tabs controller ul element. Solved issue with ul elements in tabs content.