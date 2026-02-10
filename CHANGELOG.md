# Changelog

All notable changes to this project will be documented in this file. This project follows the [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) principles and uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

### Changed

### Fixed

### Removed

---

## [3.0.1] – 2026-21-01

### Changed

- [For each text whose color is defined by the CSS color property, is the background-color property also filled in and vice versa?](https://la-va11ydette.orange.com/?lang=en&list=wcag-web#headingtestID-025) and [Pour chaque texte dont la couleur est définie par la propriété CSS color, la propriété background-color est-elle également renseignée et inversement ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-025): methodology has been rewrited to better reflect new procedure in FireFox.

---

## [3.0.0] – 2026-21-01

### Added

- 2 new criterias have been added:
  - [L'élément de formulaire est-il lié programmatiquement à son étiquette et, si présent, au message d'erreur ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-089)
  - [Les éléments de formulaire obligatoires sont-ils programmatiquement identifiables ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-090)
  - [L'utilisateur peut-il s'authentifier avec un nom d'utilisateur et un mot de passe sans utiliser de test s'appuyant sur des fonctions cognitives ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-091). This criteria is a new version of the previous testID-086 (see **Removed**).
  - [Les contenus cachés doivent-ils être ignorés par les technologies d'assistance ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-092).

### Changed

- [Chaque élément de formulaire possède-t-il une étiquette visible ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-001): basic wording changes

- [Un format de données est-il indiqué, si besoin ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-005):testID-005 has been renamed (old name was **Pour les champs nécessitant un type ou un format de données précis, ce format de données est-il indiqué clairement à l'utilisateur ?**) and more information was added to warn user to check if the format is explicit enough in testID-002.

- [Chaque champ de formulaire a-t-il un nom accessible pertinent ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-067) has been renamed (old name was **Chaque champ de formulaire a-t-il un nom accessible ?**) and more details were added to the corresponding methodology.

- [Les éléments de formulaire sont-ils regroupés lorsque nécessaire ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-003) has been renamed (old name was **Les champs sont-ils regroupés lorsque nécessaire ?**) and more details were added to the corresponding methodology.

- [Chaque étiquette et légende de champ est-elle pertinente ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-002) has been renamed (old name was **Chaque étiquette de champ est-elle pertinente ?**) and more details were added to the corresponding methodology.

- [Les éléments de formulaire obligatoires sont-ils identifiables ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-004) has been renamed (old name was **Les champs obligatoires sont-ils identifiables ?**) and more details were added to the corresponding methodology.

- [Les champs en erreur sont-ils identifiables et l'erreur est-elle décrite sous forme de texte ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-006) has been renamed (old name was **Les champs en erreur sont-ils identifiables ?**) and more details were added to the corresponding methodology.

- [Les messages d'erreur et les suggestions sont-ils explicites ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-007) has been renamed (old name was **Les messages d'erreur sont-ils explicites ?**) and more details were added to the corresponding methodology.

- [Les messages d'état sont-ils correctement restitués ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-034) has been renamed (old name was **Les messages de statuts sont-ils correctement restitués ?**) and more details were added to the corresponding methodology.

- [Les étiquettes visibles et les noms des boutons sont-ils présents et pertinents ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-069) has been renamed (old name was **Chaque libellé de bouton est-il présent et pertinent ?**) and more details were added to the corresponding methodology.

- [Il n'y a aucun clignotement perturbant pour l'utilisateur](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-036) has been renamed (old name was **Il n'y a aucun clignotement de plus de 3 flashs par seconde sur une zone égale ou supérieure à 21 824 px²**) and more details were added to the corresponding methodology.

### Fixed

- [Pour chaque formulaire sensible, l'utilisateur a-t-il le contrôle de ses données ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-009): more details were added to the corresponding methodology.

- [Le titre de la page est-il pertinent ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-017): more details were added to the corresponding methodology.

- [Le contenu est-il structuré sémantiquement ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-068): more details were added to the corresponding methodology.

- [La langue principale est-elle définie et correspond-elle à la langue principale du document ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-021): more details were added to the corresponding methodology.

- [Les tableaux sont-ils correctement structurés ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-023): methodology has been rewrited for better comprehension.

- [Les images possèdent-elles un texte de remplacement pertinent ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-013): more details were added to the corresponding methodology.

- [Aucune image ne présente du texte qui pourrait être mis en forme via CSS ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-062): more details were added to the corresponding methodology.

- [Le contraste entre la couleur du texte et la couleur de son arrière-plan est-il suffisamment élevé (hors cas particuliers) ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-024): more details were added to the corresponding methodology.

- [Les couleurs utilisées dans les composants d'interface ou les éléments graphiques porteurs d'informations sont-elles suffisamment contrastées ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-026): more details were added to the corresponding methodology.

- [Le site dispose-t-il d'au moins 2 mécanismes de navigation ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-033): more details were added to the corresponding methodology.

- [Si un contenu de la page est en mouvement, défile, clignote ou se met à jour, durant plus de 5 secondes et démarrant automatiquement, l'utilisateur a-t-il la possibilité de stopper, mettre en pause, masquer ou modifier sa fréquence de rafraichissement de ce contenu ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-035): more details were added to the corresponding methodology.

- [L'utilisateur a-t-il le contrôle des changements de contexte à la prise de focus au clavier ou au survol souris ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-032): more details were added to the corresponding methodology.

- [L'utilisateur a-t-il le contrôle des changements de contexte lors d'une modification de paramètre ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-061): more details were added to the corresponding methodology.

- [Si un mécanisme d'aide est proposé et répété sur plusieurs pages, celui-ci est-il présenté dans le même ordre relatif ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-085): more details were added to the corresponding methodology.

- [Les fonctionnalités de la page sont-elles utilisables au clavier ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-037): more details were added to the corresponding methodology.

- [Le focus est-il présent et suffisamment visible ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-041): more details were added to the corresponding methodology.

- [Après désactivation du CSS, la page reste-t-elle compréhensible ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-058): more details were added to the corresponding methodology.

### Removed

- Criteria **En cas d'erreur, est-ce qu'une suggestion de correction est proposée à l'utilisateur ?** (testID-088) has been removed.
- Criteria **L'utilisateur peut-il s'authentifier avec un nom d'utilisateur et un mot de passe sans utiliser de test s'appuyant sur des fonctions cognitives ?** (testID-086) has been removed and replaced by a new version (testID-091).

---

## [2.2.0] - 2023-10-06

### Ajouté

- [Si une information est fournie par ou à l'utilisateur dans un même processus, sa saisie n'est t-elle pas redemandée ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-079)

    Nouveau critère relié au [WCAG 3.3.7 A](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry)

- [L'utilisateur peut-il s'authentifier sans utiliser un test s'appuyant sur des fonctions cognitives ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-077)

    Nouveau critère relié au [WCAG 3.3.8 AA](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication)

- [Le focus est-il complètement masqué ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-081)

    Nouveau critère relié au [WCAG 2.4.11 AA](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum)

- [Si une aide est proposée et répétée sur plusieurs pages, celle-ci est-elle présentée de manière cohérente ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-078)

    Nouveau critère relié au [WCAG 3.2.6 A](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help)

- [La taille des zones cliquables ou tactiles est-elle suffisante ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-076)

    Nouveau critère relié au [WCAG 2.5.8 AA](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

- [Les fonctionnalités utilisant l'action de glisser et déposer ont-elles une alternative ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-080)

    Nouveau critère relié au [WCAG 2.5.7 AA](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements)

### Modifié

- [Chaque champ de formulaire possède-t-il une étiquette?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-001)

    Ajout d'une information à la fin de la vérification "Attention, le placeholder n'est pas considéré comme assez robuste pour valider ce critère"

- [Les champs obligatoires sont-ils identifiables ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-004)

    Précision que si des champs obligatoires ont juste un astérisque (*), il faut préciser au début du champ qu'il signifie qu'il est obligatoire

- [La prise de focus est-elle visible ?](https://la-va11ydette.orange.com/?list=wcag-web&lang=fr#headingtestID-041)

    Passage du critère WCAG 2.4.7 de AA à A.

### Supprimé

- [Le code source est-il valide ?](https://www.w3.org/WAI/WCAG21/Understanding/parsing.html)

    Le critère est déprécié, il est donc supprimé avec la sortie des WCAG 2.2

## This changelog begins at [1.7.0]
