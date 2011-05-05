
XCSS === Extended CSS.

XCSS is meant to be used actively by Javascript as an extra feature of CSS.

You feed it delicious CSS files and it parses the CSS into Javascript objects. As you use the API to change entire rules or even properties, XCSS will update those rules live.

Currently, the API looks like this:

--GET--
XCSS.get.rules() - This returns all rule objects.
XCSS.get.properties() - This returns all properties that have been parsed.

--MOD--
XCSS.mod.rule("selector",{properties}) - This is how you can directly modify rules. As your first argument, you provide the exact selector, and then you can modify or add properties to that rule in a key : value structure.
XCSS.mod.properties({properties}) - You can provide this method with however many properties you can give it in a key-value structure. This changes EVERY property in your CSS "document"

--ADD--
XCSS.add.rule("selector",{properties}) - Alias of XCSS.mode.rule()
XCSS.add.properties({properties},[rules]) - Add a key-value object of properties to all the rules (selectors) you provide as the second argument to the function

--DEL--
XCSS.del.rules([rules]) - Deletes all rules (selectors) in the provided array.
XCSS.del.properties() - Not yet implemented. This deletes all properties found in your CSS file. Why would you use this? I don't know.