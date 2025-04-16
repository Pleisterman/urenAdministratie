<?php

/*
        @package        Pleisterman/MbAdmin
        function:       public landing site
        Last revision:  02-03-2025
 
*/

require_once 'vendor/autoload.php';

use php\main\main;
use php\js\scripts;
use php\db\userOptions\userOptions;

echo '<!DOCTYPE html>';
echo '<html lang=nl>';
    echo '<head>';

    echo '<title>MbAdmin Uren administratie</title>';
    echo '<link rel="shortcut icon" href="assets/favicon.ico">;';
     
       
    echo '</head>';
    echo '<body>';

    // create main class
    $main = new main();
    
    // clear debugger log
    $main->clearDebuggerLog();
    
    // create scripts
    $scripts = new scripts();

    // gt user options
    $userOptions = new userOptions( $main->getDebbuger(), $main->getDatabase() );
    
    // get scripts
    $script = $scripts->getIndexScript( $userOptions->getAll() );
    
    // add scripts
    echo $script;

    // get modules script
    $modulesScript = $scripts->getModulesScript();
    
    // add modules
    echo $modulesScript;


    echo '</body>';
echo '</html>';
