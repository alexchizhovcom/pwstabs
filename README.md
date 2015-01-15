# PWS Tabs jQuery Plugin

jQuery Plugin to create tabs.

All you need to do is add few divs for your tabs, and script will generate Tabs for you.

## Demo

You can check out online demo at http://alexchizhov.com/pwstabs


## Documentation

### Getting Started

All you really need to do is to create a DIV block, with DIV blocks in it and add DATA attributes.

1) Lets create main DIV:
<pre><code>&lt;div class="hello_world"&gt;&lt;/div&gt;</code></pre>

<br>

2) Lets say we want 3 tabs, lets create three DIVs and add DATA attributes like so:
<pre><code>&lt;div class="hello_world"&gt;

   &lt;div data-pws-tab="anynameyouwant1" data-pws-tab-name="Tab Title 1"&gt;Our first tab&lt;/div&gt;
   &lt;div data-pws-tab="anynameyouwant2" data-pws-tab-name="Tab Title 2"&gt;Our second tab&lt;/div&gt;
   &lt;div data-pws-tab="anynameyouwant3" data-pws-tab-name="Tab Title 3"&gt;Our third tab&lt;/div&gt;

&lt;/div&gt;</code></pre>


<strong>data-pws-tab</strong> is used to initiate the tab and as its ID.

<strong>data-pws-tab-name</strong> is used for a tab display name. Tabs are created automaticaly with this name!


### Include Plugin Files

Just place plugins files into <strong>&lt;head&gt;</strong> section. <strong>Plugin requires jQuery!</strong>

<pre><code>&lt;!-- Include jQuery if needed --&gt;
&lt;script src="//code.jquery.com/jquery-1.11.2.min.js"&gt;&lt;/script&gt;

&lt;link type="text/css" rel="stylesheet" href="jquery.pwstabs.css"&gt;
&lt;script src="jquery.pwstabs-1.1.0.js"&gt;&lt;/script&gt;</code></pre>


### Initiate Plugin

<pre><code>jQuery(document).ready(function($){
   $('#tabset0').pwstabs();        
});</code></pre>


### Initiate Plugin With Options
<pre><code>jQuery(document).ready(function($){
   $('.tabset1').pwstabs({
      effect: 'scale',
      defaultTab: 3,
      containerWidth: '600px'
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
</tr>
</thead>
<tbody>
<tr>
<td>effect</td>
<td>scale</td>
<td>Transition effect</td>
<td>scale / slideleft / slideright / slidetop / slidedown</td>
</tr>
<tr>
<td>defaultTab</td>
<td>1</td>
<td>Which tab is chosen by default</td>
<td>Tab ID number starts with 1 (1,2,3..)</td>
</tr>
<tr>
<td>containerWidth</td>
<td>100%</td>
<td>Tabs container width</td>
<td>Any size value (1,2,3.. / px,pt,em,%,cm..)</td>
</tr>
</tbody>
</table>
