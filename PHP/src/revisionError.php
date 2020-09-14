<?php

// comprobar fallo
public function indexAction(Application $app, Request $request)
{
    if ($app->getConfig('maintenance') && !in_array($request->getClientIp(), $app->getConfig('excludeIpsFromMaintenance'))) {
        return $app['twig']->render('@MainLayouts/maintenance.html.twig', ['endDate' => $app->getConfig('maintenanceEndDate')]);
    }
 
    try {
        $databaseUser = $app->getDatabaseUser();
        $user = new User($databaseUser);
        if (!$databaseUser->getProfile()->isInitialized()) {
            $preferences = $this->getApp()->getEm()->getRepository('\CS\Entity\OcPreferences')
            ->findOneBy(['userid' => $databaseUser->getUid(), 'configkey' => 'lang', 'appid' => 'core']);

            if (null != $preferences) 
                $form = $user->getInitForm($databaseUser->getProfile()->getDisplayname(), $preferences->getConfigvalue());
        }
        
        return $app['twig']->render('@MainLayouts/init.html.twig', ['form' => $form->createView()]);
    } catch (\Exception $e) {
        throw $e;
    }
 }
 

 
?>