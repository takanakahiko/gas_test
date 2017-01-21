function test(){
  var page = UrlFetchApp.fetch("http://tv.littlewitchacademia.jp/news/");
  var doc = Xml.parse(page, true);
  var bodyHtml = doc.html.body.toXmlString();
  doc = XmlService.parse(bodyHtml);
  var root = doc.getRootElement();
  var node1 = querySelectorAll(root,"#list_01")[0];
  var node2 = querySelectorAll(node1,"table")[0];
  var node3 = querySelectorAll(node2,"tr")[0];
  var node4 = querySelectorAll(node3,".read")[0];
  var node5 = querySelectorAll(node4,"div")[0];
  var node6 = querySelectorAll(node5,"span")[0];
  var node7 = querySelectorAll(node6,"a")[0];
  var text = node7.getText();
  Logger.log(text);
  
  //#list_01 > table > tbody > tr:nth-child(1) > td.read > div > span > a
}

function querySelectorAll(element,selecter){
  var ret = [];
  switch(selecter[0]){
    case '#':
      var id = selecter.substr(1);
      ret.push(getElementById(element,id));
      break;
    case '.':
      var class = selecter.substr(1);
      ret = getElementsByClassName(element, class);
      break;
    default:
      ret = getElementsByTagName(element, selecter);
      break;
  }
  return ret;
}

function getElementById(element, idToFind) {  
  var descendants = element.getDescendants();  
  for(i in descendants) {
    var elt = descendants[i].asElement();
    if( elt !=null) {
      var id = elt.getAttribute('id');
      if( id !=null && id.getValue()== idToFind) return elt;    
    }
  }
}

function getElementsByClassName(element, classToFind) {  
  var data = [];
  var descendants = element.getDescendants();
  descendants.push(element);  
  for(i in descendants) {
    var elt = descendants[i].asElement();
    if(elt != null) {
      var classes = elt.getAttribute('class');
      if(classes != null) {
        classes = classes.getValue();
        if(classes == classToFind) data.push(elt);
        else {
          classes = classes.split(' ');
          for(j in classes) {
            if(classes[j] == classToFind) {
              data.push(elt);
              break;
            }
          }
        }
      }
    }
  }
  return data;
}

function getElementsByTagName(element, tagName) {  
  var data = [];
  var descendants = element.getDescendants();  
  for(i in descendants) {
    var elt = descendants[i].asElement();     
    if( elt !=null && elt.getName()== tagName) data.push(elt);      
  }
  return data;
}