/**
 * ==============================================================================
 * CONFIGURATION DE L'IMAGE D'ARRIÈRE-PLAN DU HERO (SECTION ACCUEIL)
 * ==============================================================================
 * 
 * Cette constante définit l'image professionnelle affichée UNIQUEMENT
 * sur la section « ACCUEIL / HERO » de la page principale.
 * 
 * POUR REMPLACER FACILEMENT L'IMAGE :
 * -----------------------------------
 * Option 1 : Remplacer par une URL web directe (ex: Unsplash, CDN, etc.) :
 *   export const HERO_BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=1920&q=80";
 * 
 * Option 2 : Remplacer par un fichier d'image local dans votre projet :
 *   import monImage from '../assets/images/mon-image.jpg';
 *   export const HERO_BACKGROUND_IMAGE = monImage;
 */

import womanHeroBg from '../assets/images/woman_holding_card_1788946813216.jpg';

// 👉 Image d'arrière-plan de la femme souriante tenant une carte :
export const HERO_BACKGROUND_IMAGE: string = womanHeroBg;
