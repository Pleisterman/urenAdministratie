/*
    @package        Pleisterman/MbAdmin

    function:       Generates a html string from json and 
                    adds an element to the dom. 

                    Adds the function:

                        mbAdminApp.prependContainer( html element id: parentId, named array: json ) void
                        mbAdminApp.appendContainer( html element id: parentId, named array: json ) void
                    
                    to the application

    Last revision:  29-01-2025
 
*/

// create module function
( function( mbAdminApp ){
    
    // create name space
    mbAdminApp.service = mbAdminApp.service ? mbAdminApp.service : {};
    
    // MODULE: htmlGeneratorModule( void ) named array 
    mbAdminApp.service.htmlGeneratorModule = function( ) {        
        // PRIVATE:
        
        // MEMBERS
        let self = this;                                    // object
        self.moduleName = 'HtmlGeneratorModule';            // string
        self.debugOn = false;                               // boolean
        self.closeElements = [                              // array
            'a',                                            // string
            'div',                                          // string
            'form',                                         // string
            'svg',                                          // string
            'iframe'                                        // string
        ];                                                  // done array
        self.valueProperties = [                            // array
            '',                                             // string
            '',                                             // string
            '',                                             // string
            '',                                             // string
            '',                                             // string
            '',                                             // string
            'size',                                         // string
            '',                                             // string
            '',                                             // string
            '',                                             // string
            '',                                             // string
            '',                                             // string
            '',                                             // string
            ''                                              // string
        ];                                                  // done array
        self.properties = {                                 // array
            'id'                :   'id',                   // string
            'name'              :   'name',                 // string
            'class'             :   'class',                // string
            'type'              :   'type',                 // string
            'src'               :   'src',                  // string
            'href'              :   'href',                 // string
            'target'            :   'target',               // string
            'method'            :   'method',               // string
            'action'            :   'action',               // string
            'title'             :   'title',                // string
            'size'              :   'size',                 // string
            'columns'           :   'cols',                 // string
            'rows'              :   'rows',                 // string
            'maximumLength'     :   'maxlength',            // string
            'rowSpan'           :   'rowspan',              // string
            'columnSpan'        :   'colspan',              // string
            'multiple'          :   'multiple',             // string
            'readOnly'          :   'readonly',             // string
            'controls'          :   'controls'              // string
        };                                                  // done array
        self.booleanProperties = [                          // array
            'checked'                                       // strings
        ];                                                  // done array
        self.styles = {                                     // named array
            'zIndex'            :   'z-index',              // string
            'position'          :   'position',             // string
            'float'             :   'float',                // string
            'clear'             :   'clear',                // string
            'top'               :   'top',                  // string
            'left'              :   'left',                 // string
            'display'           :   'display',              // string
            'justifyContent'    :   'justify-content',      // string
            'gap'               :   'gap',                  // string
            'borderRadius'      :   'border-radius',        // string
            'alignItems'        :   'align-items',          // string
            'alignContent'      :   'align-content',        // string
            'flexWrap'          :   'flex-wrap',            // string
            'flexDirection'     :   'flex-direction',       // string
            'opacity'           :   'opacity',              // string
            'overflow'          :   'overflow',             // string
            'overflowX'         :   'overflow-x',           // string
            'overflowY'         :   'overflow-y',           // string
            'cursor'            :   'cursor',               // string
            'background'        :   'background',           // string
            'backgroundColor'   :   'background-color',     // string
            'backgroundRepeat'  :   'background-repeat',    // string
            'backgroundPosition':   'background-position',  // string
            'backgroundSize'    :   'background-size',      // string
            'color'             :   'color',                // string
            'minimumWidth'      :   'min-width',            // string
            'maximumWidth'      :   'max-width',            // string
            'minimumHeight'     :   'min-height',           // string
            'maximumHeight'     :   'max-height',           // string
            'width'             :   'width',                // string
            'height'            :   'height',               // string
            'fontFamily'        :   'font-family',          // string
            'fontSize'          :   'font-size',            // string
            'lineHeight'        :   'line-height',          // string
            'letterSpacing'     :   'letter-spacing',       // string
            'fontWeight'        :   'font-weight',          // string
            'textAlign'         :   'text-align',           // string
            'textDecoration'    :   'text-decoration',      // string
            'verticalAlign'     :   'vertical-align',       // string
            'margin'            :   'margin',               // string
            'marginTop'         :   'margin-top',           // string
            'marginLeft'        :   'margin-left',          // string
            'marginRight'       :   'margin-right',         // string
            'marginBottom'      :   'margin-bottom',        // string
            'padding'           :   'padding',              // string
            'paddingTop'        :   'padding-top',          // string
            'paddingLeft'       :   'padding-left',         // string
            'paddingRight'      :   'padding-right',        // string
            'paddingBottom'     :   'padding-bottom',       // string
            'imageUrl'          :   'background-image',     // string
            'transformOrigin'   :   'transform-origin',     // string
            'transform'         :   'transform',            // string
            'boxShadow'         :   'box-shadow',           // string
            'textShadow'        :   'text-shadow',          // string
            'pointerEvents'     :   'pointer-events'        // string
        };                                                  // done named array
        self.borders = {                                    // named array
            'border'            :   'border',               // string
            'borderLeft'        :   'border-left',          // string
            'borderRight'       :   'border-right',         // string
            'borderTop'         :   'border-top',           // string
            'borderBottom'      :   'border-bottom'         // string
        };                                                  // done named array
        self.imageVersion = mbAdminApp.options.imageVersion ?
                            mbAdminApp.options.imageVersion :
                            '001';                          // string        
        // DONE MEMBERS     
        
        // FUNCTIONS
        self.construct = function() {
        // FUNCTION: construct( void ) void            
            
            // add the extensions to the app
            self.addApplicationsExtensions();
            
        // DONE FUNCTION: construct( void ) void
        };        
        self.addApplicationsExtensions = function(){
        // FUNCTION: addApplicationsExtensions( void ) void            
        
            // add prepend container
            mbAdminApp.prependContainer = self.prependContainer;
        
            // add append container
            mbAdminApp.appendContainer = self.appendContainer;
        
        // DONE FUNCTION: addApplicationsExtensions( void ) void
        };        
        self.prependContainer = function( parentId, json ){
        // FUNCTION: prependContainer( html element id: parentId, named array: json ) void
        
            // create child
            let child = self.createElement( json );
            
            // add style
            self.addStyle( child, json );
            
            // add properties
            self.addProperties( child, json );
            
            // add text
            self.addText( child, json );
            
            // prepend child
            self.prependChild( parentId, child );            
        
        // DONE FUNCTION: prependContainer( html element id: parentId, named array: json ) void
        };        
        self.appendContainer = function( parentId, json ){
        // FUNCTION: appendContainer( html element id: parentId, named array: json ) void
        
            // create child
            let child = self.createElement( json );
            
            // add style
            self.addStyle( child, json );
            
            // add properties
            self.addProperties( child, json );
            
            // add images
            self.addImages( child, json );
            
            // add text
            self.addText( child, json );
            
            // append child
            self.appendChild( parentId, child );            
        
        // DONE FUNCTION: appendContainer( html element id: parentId, named array: json ) void
        };        
        self.prependChild = function( parent, child ){
        // FUNCTION: prependChild( html element / html element id: parent, html element: child ) void
       
            // parent is document body
            if( parent === document.body ){

                // add child
                document.body.insertBefore( child, document.body.firstChild );

                // done
                return;
                
            }
            // parent is document body
       
            // get parent element
            let parentElement = document.getElementById( parent );
            
            // add child
            parentElement.insertBefore( child, parentElement.firstChild );
            
        // DONE FUNCTION: prependChild( html element / html element id: parent, html element: child ) void
        };        
        self.appendChild = function( parent, child ){
        // FUNCTION: appendChild( html element / html element id: parent, html element: child ) void
       
            // parent is document body
            if( parent === document.body ){

                // add child
                document.body.appendChild( child );

                // done
                return;
                
            }
            // parent is document body
       
            // get parent element
            let parentElement = document.getElementById( parent );
            
            // add child
            parentElement.appendChild( child );
            
        // DONE FUNCTION: appendChild( html element / html element id: parent, html element: child ) void
        };        
        self.createElement = function( json ){
        // FUNCTION: createElement( named array: json ) string
       
            // create element
            let element = document.createElement( json['element'] );
            
            // id is set
            if( json['id'] !== undefined ){
                
                // set id
                element.id = json['id'];
            
            }
            // id is set
            
            // create element
            return element;
            
        // DONE FUNCTION: createElement( named array: json ) string
        };        
        self.addProperties = function( child, json ){
        // FUNCTION: addProperties( html element: child, named array: json ) string
        
            // loop over properties
            Object.entries( self.properties ).forEach( ( [key, value] ) => {
                
                // property exists
                if( json[key] !== undefined ){
                    
                    // set property
                    child.setAttribute( value, json[key] );
                    
                }
                // property exists                
                
            });
            // loop over properties
                        
            // add boolean properties
            self.addBooleanProperties( child, json );
                        
        // DONE FUNCTION: addProperties( html element: child, named array: json ) string
        };        
        self.addBooleanProperties = function( child, json ){
        // FUNCTION: addBooleanProperties( html element: child, named array: json ) string
        
            // loop over boolean properties
            Object.entries( self.booleanProperties ).forEach( ( [key, value] ) => {
                
                // property is true
                if( json[value] ){
                    
                    // set property
                    child[value] = true;
                    
                }
                // property is true
                
            });
            // loop over boolean properties
                        
        // DONE FUNCTION: addBooleanProperties( html element: child, named array: json ) string
        };        
        self.addStyle = function( element, json ){
        // FUNCTION: addStyle( html element: child, named array: json ) string
        
            // create style
            let style = '';
            
            // loop over styles
            Object.entries( self.styles ).forEach( ( [key, value] ) => {
                
                // style is defined
                if( json[key] !== undefined ){
                    
                    // add style
                    style += value + ' : ' + json[key] + ';';
                    
                }
                // style is defined
                
            });
            // loop over styles
            
            // add border
            style += self.addBorder( json );
            
            // style ! empty
            if( style !== '' ){
                
                // set style
                element.setAttribute ( 'style', style );
            
            }
            // style ! empty
            
        // DONE FUNCTION: addStyle( html element, named array: json ) string
        };        
        self.addBorder = function( json ){
        // FUNCTION: addBorder( named array: json ) string
            
            // create result
            let result = '';

            // loop over borders
             Object.entries( self.borders ).forEach( ( [key, value] ) => {
                
                // border is defined
                if( json[key] !== undefined ){
                    
                    // add border
                    result += value + ':';
                    
                    // get border html
                    result += self.getBorderHtml( json );
                    
                }
                // border is defined
                
            });
            // loop over borders
            
            // return result
            return result;
            
        // DONE FUNCTION: addBorder( named array: json ) string
        };        
        self.getBorderHtml = function( json ){
        // FUNCTION: getBorderHtml( named array: json ) string
            
            // create result
            let result = '';

            result += json['borderWidth'];
            result += ' ';
            result += json['borderColor'];
            result += ' ';
            result += json['borderStyle'];
            result += ';';
            
            // return result
            return result;            
            
        // DONE FUNCTION: getBorderHtml( named array: json ) string
        };        
        self.addImages = function( element, json ){
        // FUNCTION: addImages( html element, named array: json ) string
        
            // file name ! exists
            if( json['backgroundImage'] !== undefined && 
                json['backgroundImage']['fileName'] !== undefined ){
        
                // create url
                var url = 'url(' + 
                        json['backgroundImage']['url'] + '/' + 
                        json['backgroundImage']['fileName']  + 
                        '?version=' + self.imageVersion +
                    ')';
                // create url

                // set image url
                element.style.backgroundImage = url;
                
            }
            // file name ! exists
        
        // DONE FUNCTION: addImages( html element, named array: json ) string
        };        
        self.addText = function( element, json ){
        // FUNCTION: addText( html element, named array: json ) string
        
            // has text
            if( json['text'] ){
                
                // set text
                element.innerHTML = json['text'];
                
            }
            // has text
            
        // DONE FUNCTION: addText( html element, named array: json ) string
        };        
        self.debug = function( message ) {
        // FUNCTION: debug( string: message ) void
            
            // debug on
            if( self.debugOn ) {
                
                // call app debug
                mbAdminApp.debug( self.moduleName + ' ' + message );
                
            }
            // done debug on
            
        // DONE FUNCTION: debug( string: message ) void
        };
        // DONE FUNCTIONS

        // initialize the class 
        self.construct();
        // DONE PRIVATE
        
        // PUBLIC
        return {
        };
        // DONE PUBLIC
                
    };
    // DONE MODULE: htmlGeneratorModule( void ) named array 
    
})( mbAdminApp );
// done create module function
