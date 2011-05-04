var XCSS = {
	init : (function() {
		//private
		var that = this;
		this.rules = {};
		this.properties = {};
		this.parseCSS = function(file) {			
			var file = file.strip(), propString, selector, 
					specValue, gottenValue, specTest,
					res, props, pObjarray, escselector;
			file = file.gsub("	","").gsub("\r\n","").gsub(" ",""); //getting rid of line breaks, tabs, and spaces
			res = file.replace(/{([^}]*)}/gm,"{}").match(/([#|\.]?)([\w|:|\s|\.]+)/gmi); //getting all the selectors
			res.each(function(r) {
				r.gsub("}","}|").split("|")
				selector = r.gsub("{","").strip();
				this.rules[selector] = {};
				if (!selector[0].match(/[a-zA-Z]/)) {
					escselector = "\\"+selector;
				} else {
					escselector = selector;
				}
				propRegexp = new RegExp(""+escselector+"(.*?)\}","g"); 
				propString = propRegexp.exec(file);//using the selector to find it's properties
				propString.length=1;
				propString = propString.join("");
				props = propString.match(/{(.*)}/g).join(""); //getting the selector out of the equation
				props = props.gsub("{","").gsub("}",""); //stripping the curlies
				propArray = props.split(";"); //splitting the rules apart by their respective semicolons
				propArray.each(function(p) {
					if (p) {
						pObjarray = p.split(":"); //splitting the key and value
						specTest = pObjarray[1].match(/(\/\*)(.*)(\*\/)/g);
						if (specTest) { //if it's a special value
							specValue = pObjarray[1].gsub("/*","").gsub("*/","");
							specValue = specValue.split(">");
							gottenValue = this.rules[specValue[0]][specValue[1]];
							pObjarray[1] = gottenValue;
						}
						this.rules[selector][pObjarray[0]] = pObjarray[1]; //building the rule object
						if (!this.properties[pObjarray[0]]) {
							this.properties[pObjarray[0]] = [];
						}
						this.properties[pObjarray[0]].push(selector); //building the property->rule map
					}
				})
			})
			return this.rules;
		}
		this.renderCSS = function() {
			var css='', oRule;
			for (rule in this.rules) {
				oRule = this.rules[rule];
				css+=rule+"{";
				for (prop in oRule) {
					css+=prop+":"+oRule[prop]+";";
				}
				css+="}";
			}
			return css;
		}
		this.insertCSS = function() {
			if ($("XCSS_style")) {
				$("XCSS_style").remove();
			}
			$$("head")[0].insert("<style id='XCSS_style'>"+this.renderCSS()+"</style>");
			
		}
		this.loadCSS = function(files) {
			var rt='';
			files.each(function(f) {
				ajaxobj = new Ajax.Request(f, {
					asynchronous : false
				});
				rt+=ajaxobj.transport.responseText;
			})
			that.parseCSS(rt);
			that.insertCSS();
			return {loaded : true};
		}
		//public
		return function() {
			var pblc = this;
			that.loadCSS($A(arguments));
			this.get = {
				rules : function() {
					return that.rules;
				},
				properties : function() {
					return that.properties;
				}
			}
			this.mod = {
				properties : function(props) {
					var rules, affected=[];
					for (prop in props) {
						rules = that.properties[prop];
						affected = affected.concat(rules);
						rules.each(function(r) {
							that.rules[r][prop] = props[prop];
						})
					}
					that.insertCSS();
					return {affected : affected};
				},
				rule : function(rule, props) {
					var oRule = that.rules[rule];
					for (prop in props) {
						if (!oRule) {
							that.rules[rule] = {};
							oRule = that.rules[rule];
						}
						if (!oRule[prop]) {
							if (!that.properties[prop]) {
								that.properties[prop] = [];
								that.properties[prop].push(rule);
							} else {
								that.properties[prop].push(rule);
							}
						}
						oRule[prop] = props[prop];
					}
					that.insertCSS();
					return oRule;
				}
			}
			this.add = {
				rule : function(rule, props) {
					return pblc.mod.rule(rule, props);
				},
				properties : function(props, rules) {
					for (prop in props) {
						that.properties[prop] = rules;
						rules.each(function(r) {
							if (!that.rules.hasOwnProperty(r)) {
								that.rules[r] = {};
							}
							that.rules[r][prop] = props[prop];
						})
					}
					that.insertCSS();
					return {affected : rules};
				}
			}
			this.del = {
				rules : function() {
					$A(arguments).each(function(a) {
						delete that.rules[a];
					})
					that.insertCSS();
				},
				properties : function() {
					$A(arguments).each(function(a) {
						
					})
					that.insertCSS();
				}
			}
		}
	}())
};



