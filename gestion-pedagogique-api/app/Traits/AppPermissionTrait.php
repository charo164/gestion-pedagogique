<?php

namespace App\Traits;

trait AppPermissionTrait
{
  static $ROLES = [
    'ADMIN' => 'admin',
    'RP' => 'rp',
    'PROFESSOR' => 'professor',
    'ATTACHE' => 'attache',
    'STUDENT' => 'student',
  ];

  static $PERMISSIONS = [
    'GERER_UTILISATEURS' => 'gerer_utilisateurs',
    'GERER_ROLES' => 'gerer_roles',
    'GERER_PERMISSIONS' => 'gerer_permissions',
    'GERER_ANNEES_SCOLAIRES' => 'gerer_annees_scolaires',
    'GERER_CLASSES' => 'gerer_classes',
    'VOIR_LES_ATTACHES' => 'voir_les_attaches',
    'PLANIFIER_CLASSES' => 'planifier_classes',
    'GERER_PROFESSEURS' => 'gerer_professeurs',
    'GERER_ETUDIANTS' => 'gerer_etudiants',
    'GERER_SALLES' => 'gerer_salles',
    'GERER_SEMESTRES' => 'gerer_semestres',
    'GERER_MODULES' => 'gerer_modules',
    'PLANIFIER_COURS' => 'planifier_cours',
    'PLANIFIER_SESSIONS' => 'planifier_sessions',
    'INSCRIRE_ETUDIANTS' => 'inscrire_etudiants',
    'LISTER_COURS_PLANIFIES' => 'lister_cours_planifies',
    'FILTRER_COURS_PAR_ETAT' => 'filtrer_cours_par_etat',
    'VISUALISER_SESSIONS_EFFECTUEES' => 'visualiser_sessions_effectuees',
    'LISTER_ETUDIANTS_DANS_COURS' => 'lister_etudiants_dans_cours',
    'ANNULER_SESSION_COURS' => 'annuler_session_cours',
    'LISTER_PROPRES_COURS' => 'lister_propres_cours',
    'VISUALISER_SESSIONS_ATTRIBUEES' => 'visualiser_sessions_attribuees',
    'FILTRER_COURS_PAR_PERIODE' => 'filtrer_cours_par_periode',
    'DEMANDER_ANNULATION_COURS' => 'demander_annulation_cours',
    'VOIR_NOMBRE_HEURES_COURS_MOIS' => 'voir_nombre_heures_cours_mois',
    'FILTRER_COURS_PAR_MODULE' => 'filtrer_cours_par_module',
    'VALIDER_INVALIDER_SESSIONS' => 'valider_invalider_sessions',
    'LISTER_SESSIONS_EFFECTUEES_PROFESSEUR' => 'lister_sessions_effectuees_professeur',
    'FILTRER_SESSIONS_PAR_MODULE' => 'filtrer_sessions_par_module',
    'GERER_ABSENCES_ETUDIANTS' => 'gerer_absences_etudiants',
    'VISUALISER_ABSENCES' => 'visualiser_absences',
    'JUSTIFIER_ABSENCES' => 'justifier_absences',
  ];

  public function getAppRolesWithPermissions()
  {
    return [
      $this::$ROLES['ADMIN'] => array_map(function ($permission) {
        return $permission;
      }, self::$PERMISSIONS),
      $this::$ROLES['RP'] => [
        self::$PERMISSIONS["GERER_ANNEES_SCOLAIRES"],
        self::$PERMISSIONS["GERER_CLASSES"],
        self::$PERMISSIONS["PLANIFIER_CLASSES"],
        self::$PERMISSIONS["GERER_PROFESSEURS"],
        self::$PERMISSIONS["VOIR_LES_ATTACHES"],
        self::$PERMISSIONS["GERER_ETUDIANTS"],
        self::$PERMISSIONS["GERER_SALLES"],
        self::$PERMISSIONS["GERER_SEMESTRES"],
        self::$PERMISSIONS["GERER_MODULES"],
        self::$PERMISSIONS["PLANIFIER_COURS"],
        self::$PERMISSIONS["PLANIFIER_SESSIONS"],
        self::$PERMISSIONS["INSCRIRE_ETUDIANTS"],
        self::$PERMISSIONS["LISTER_COURS_PLANIFIES"],
        self::$PERMISSIONS["FILTRER_COURS_PAR_ETAT"],
        self::$PERMISSIONS["VISUALISER_SESSIONS_EFFECTUEES"],
        self::$PERMISSIONS["LISTER_ETUDIANTS_DANS_COURS"],
        self::$PERMISSIONS["ANNULER_SESSION_COURS"],
      ],
      $this::$ROLES['PROFESSOR'] => [
        self::$PERMISSIONS["LISTER_PROPRES_COURS"],
        self::$PERMISSIONS["VISUALISER_SESSIONS_ATTRIBUEES"],
        self::$PERMISSIONS["FILTRER_COURS_PAR_PERIODE"],
        self::$PERMISSIONS["DEMANDER_ANNULATION_COURS"],
        self::$PERMISSIONS["VOIR_NOMBRE_HEURES_COURS_MOIS"],
        self::$PERMISSIONS["FILTRER_COURS_PAR_MODULE"],
        self::$PERMISSIONS["VALIDER_INVALIDER_SESSIONS"],
        self::$PERMISSIONS["LISTER_SESSIONS_EFFECTUEES_PROFESSEUR"],
        self::$PERMISSIONS["FILTRER_SESSIONS_PAR_MODULE"],
        self::$PERMISSIONS["GERER_ABSENCES_ETUDIANTS"],
      ],
      $this::$ROLES['ATTACHE'] => [
        self::$PERMISSIONS["VALIDER_INVALIDER_SESSIONS"],
        self::$PERMISSIONS["LISTER_SESSIONS_EFFECTUEES_PROFESSEUR"],
        self::$PERMISSIONS["FILTRER_SESSIONS_PAR_MODULE"],
        self::$PERMISSIONS["GERER_ABSENCES_ETUDIANTS"],
      ],
      $this::$ROLES['STUDENT'] => [
        self::$PERMISSIONS["LISTER_PROPRES_COURS"],
        self::$PERMISSIONS["VISUALISER_SESSIONS_ATTRIBUEES"],
        self::$PERMISSIONS["FILTRER_COURS_PAR_PERIODE"],
        self::$PERMISSIONS["FILTRER_COURS_PAR_MODULE"],
        self::$PERMISSIONS["VISUALISER_ABSENCES"],
        self::$PERMISSIONS["JUSTIFIER_ABSENCES"],
      ],
    ];
  }
}
