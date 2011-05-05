
<h1>XCSS === Extended CSS.</h1>

<p>XCSS is meant to be used actively by Javascript as an extra feature of CSS.</p>

<p>You feed it delicious CSS files and it parses the CSS into Javascript objects. As you use the API to change entire rules or even properties, XCSS will update those rules live.</p>

<p>You should initialize XCSS like this:</p>
<code>
XCSS.init("stylesheet1.css","stylesheet2.css");
</code>

<p>Also, you should TOTALLY write this in your <code><head></code></p>

<code>
	<noscript>
			<link media="all" type="text/css" rel="stylesheet" href="stylesheet1.css" />
			<link media="all" type="text/css" rel="stylesheet" href="stylesheet2.css" />
	</noscript>
</code>

<h2>Currently, the API looks like this:</h2>

<hr />

<h3>--GET--</h3>
<ul>
<li><b>XCSS.get.rules()</b> - This returns all rule objects.</li>
<li><b>XCSS.get.properties()</b> - This returns all properties that have been parsed.</li>
</ul>
<hr />

<h3>--MOD--</h3>
<ul>
<li><b>XCSS.mod.rule("selector",{properties})</b> - This is how you can directly modify rules. As your first argument, you provide the exact selector, and then you can modify or add properties to that rule in a key : value structure.</li>
<li><b>XCSS.mod.properties({properties})</b> - You can provide this method with however many properties you can give it in a key-value structure. This changes EVERY property in your CSS "document"</li>
</ul>
<hr />

<h3>--ADD--</h3>
<ul>
<li><b>XCSS.add.rule("selector",{properties})</b> - Alias of XCSS.mode.rule()</li>
<li><b>XCSS.add.properties({properties},[rules])</b> - Add a key-value object of properties to all the rules (selectors) you provide as the second argument to the function</li>
</ul>
<hr />

<h3>--DEL--</h3>
<ul>
<li><b>XCSS.del.rules([rules])</b> - Deletes all rules (selectors) in the provided array.</li>
<li><b>XCSS.del.properties()</b> - Not yet implemented. This deletes all properties found in your CSS file. Why would you use this? I don't know.</li>
</ul>