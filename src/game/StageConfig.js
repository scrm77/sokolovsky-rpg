/**
 * Stage Configuration
 * Defines fixed opponents for each stage (5 per stage)
 * All names match exactly with questions.json guest names
 */

export const STAGE_CONFIG = [
  // Один уровень — все 10 гостей сразу (без XP-гейта)
  [
    "Андрей Кривенко",
    "Михаил Кучмент",
    "Борис Зарьков",
    "Иван Хохлов",
    "Олег Торбосов",
    "Даниил и Давид Либерманы",
    "Фёдор Овчинников",
    "Игорь Рыбаков",
    "Леонид Гольдорт",
    "Михаил Токовинин"
  ]
];

export const STAGE_NAME_ALIASES = {};

/**
 * Get opponents for a specific stage (1-indexed)
 */
export function getStageOpponents(stageNumber) {
  const index = stageNumber - 1;
  if (index < 0 || index >= STAGE_CONFIG.length) {
    console.warn(`Invalid stage number: ${stageNumber}`);
    return [];
  }
  return STAGE_CONFIG[index];
}

/**
 * Get total number of stages
 */
export function getTotalStages() {
  return STAGE_CONFIG.length;
}

/**
 * Get the tier number for a guest by name (1-indexed)
 * Returns the tier/stage they appear in
 */
export function getGuestTier(guestName) {
  for (let tierIndex = 0; tierIndex < STAGE_CONFIG.length; tierIndex++) {
    const tier = STAGE_CONFIG[tierIndex];
    if (tier.includes(guestName)) {
      return tierIndex + 1; // Return 1-indexed tier
    }
  }
  console.warn(`Guest "${guestName}" not found in StageConfig`);
  return 1; // Default to tier 1 if not found
}
