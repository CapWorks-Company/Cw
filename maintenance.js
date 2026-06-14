/**
 * CapWorks Studio — Fichier de maintenance
 */

const IS_MAINTENANCE = true;

const MAINTENANCE_MESSAGE = "⚠️ Le site est actuellement indisponible. \nCe site est en cours de rénovation afin de vous offrir une meilleure expérience.";

// ─── Ne pas modifier en dessous ───────────────────────────────────────────────

(function () {
  // Ne pas rediriger si on est déjà sur index.html
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPage === 'index.html' || currentPage === '') return;
 
  if (IS_MAINTENANCE) {
    window.location.replace('index.html');
  }
})();
