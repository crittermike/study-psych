import { unitFactory } from '../_makeTerm';

export const UNIT = 'Health Psychology';
const t = unitFactory(UNIT);

export const TERMS = [
  t('Health psychology', 'The field that studies how biological, psychological, and social factors affect health, illness, and health-related behavior.', 'Health Psychology Foundations', 'biological, psychological, and social factors', 'A health psychologist might study how sleep, stress, and exercise affect recovery from illness.'),
  t('Stress', 'The process by which we appraise and respond to events that are challenging or threatening.', 'Health Psychology Foundations', 'challenging or threatening', 'A big exam can create stress when you judge it as important and demanding.'),
  t('Hypertension', 'Chronically high blood pressure that can increase risk for heart disease and stroke.', 'Stress & Health Risks', 'high blood pressure', 'Long-term stress can contribute to hypertension by keeping the body in a state of arousal.'),
  t('Immune suppression', 'Reduced immune system activity, often linked to chronic stress, that can make illness more likely.', 'Stress & Health Risks', 'reduced immune system activity', 'After weeks of poor sleep and stress, a student may get sick more easily because of immune suppression.'),
  t('Stressors', 'Events or conditions that trigger stress by placing demands on a person.', 'Health Psychology Foundations', 'events or conditions', 'Deadlines, traffic, arguments, and natural disasters can all be stressors.'),
  t('Daily Hassles', 'Minor everyday irritations that can accumulate and create stress over time.', 'Health Psychology Foundations', 'minor everyday irritations', 'Losing your keys, spilling coffee, and waiting in a long line are daily hassles.'),
  t('Significant Life Changes', 'Major personal events that require adjustment and can increase stress.', 'Health Psychology Foundations', 'major personal events', 'Moving, starting a new school, or a breakup can be significant life changes.'),
  t('Catastrophes', 'Large-scale disasters or traumatic events that affect many people and create intense stress.', 'Health Psychology Foundations', 'large-scale disasters', 'Earthquakes, terrorist attacks, and hurricanes are catastrophes.'),
  t('Eustress (motivating)', 'A positive form of stress that can energize, focus, and motivate performance.', 'Stress & Health Risks', 'positive form of stress', 'Feeling pumped before a competition can be eustress if it helps you perform.'),
  t('Distress (debilitating)', 'A negative form of stress that feels overwhelming and interferes with functioning.', 'Stress & Health Risks', 'negative form of stress', 'Anxiety that keeps you from studying or sleeping is distress.'),
  t('Adverse childhood experiences (ACEs)', 'Potentially traumatic events in childhood, such as abuse, neglect, or household instability, that can affect later health.', 'Stress & Health Risks', 'potentially traumatic events', 'Exposure to neglect or family violence is an adverse childhood experience.'),
  t('General adaptation syndrome (GAS)', "Hans Selye's three-stage stress response pattern: alarm, resistance, and exhaustion.", 'Stress Response Patterns', 'three-stage stress response', 'GAS explains why the body can mobilize at first but become worn down by chronic stress.'),
  t('Alarm reaction phase', 'The initial emergency response to a stressor when the sympathetic nervous system activates.', 'Stress Response Patterns', 'initial emergency response', 'Your heart races and adrenaline rises during the alarm reaction phase.'),
  t('Resistance phase', 'The stage of GAS in which the body makes a continued effort to cope with a persistent stressor.', 'Stress Response Patterns', 'continued effort to cope', 'A person may keep functioning during finals week, but their body is still using stress resources in the resistance phase.'),
  t('Fight-flight-freeze response', 'An automatic stress response that prepares the body to fight, flee, or freeze in the face of threat.', 'Stress Response Patterns', 'fight, flee, or freeze', 'When a car swerves toward you, you may jump away, freeze briefly, or prepare to act.', ['fight flight freeze response', 'flight-flight-freeze response']),
  t('Exhaustion phase', 'The stage of GAS when the body becomes depleted after prolonged stress and vulnerability to illness increases.', 'Stress Response Patterns', 'depleted after prolonged stress', 'After months of unmanaged stress, a person may feel burned out and get sick more often.'),
  t('Tend-and-befriend theory', 'A stress response pattern, often associated with oxytocin and social bonding, in which people protect offspring and seek social support.', 'Stress Response Patterns', 'protect offspring and seek social support', 'Calling friends and caring for family during a crisis can reflect tend-and-befriend coping.'),
  t('Problem-focused coping', 'A coping strategy that attempts to change the stressor or solve the problem causing stress.', 'Coping & Positive Psychology', 'change the stressor', 'Making a study schedule to handle exam stress is problem-focused coping.'),
  t('Emotion-focused coping', 'A coping strategy that attempts to manage emotional reactions to a stressor rather than changing the stressor itself.', 'Coping & Positive Psychology', 'manage emotional reactions', 'Meditating or journaling after a bad day can be emotion-focused coping.'),
  t('Positive psychology', 'The scientific study of human strengths and flourishing, including happiness, meaning, resilience, and virtues.', 'Coping & Positive Psychology', 'human strengths and flourishing', 'Positive psychology studies gratitude, optimism, and well-being instead of only disorders.'),
  t('Subjective Well-being', "A person's personal evaluation of happiness, life satisfaction, and emotional balance.", 'Coping & Positive Psychology', 'personal evaluation of happiness', 'Someone with high subjective well-being usually feels satisfied with life and often experiences positive emotions.'),
  t('Resilience', 'The ability to adapt well and recover after adversity, trauma, or significant stress.', 'Coping & Positive Psychology', 'adapt well', 'A resilient student seeks support and keeps going after a setback.'),
  t('Posttraumatic Growth', 'Positive psychological change that can occur after struggling with a major life crisis or trauma.', 'Coping & Positive Psychology', 'positive psychological change', 'After surviving an accident, someone may develop deeper relationships and a stronger sense of purpose.'),
  t('Positive Emotions', 'Pleasant feeling states such as joy, hope, interest, love, and pride that can broaden thinking and build resources.', 'Coping & Positive Psychology', 'pleasant feeling states', 'Feeling gratitude and joy can help people connect with others and cope better.'),
  t('Gratitude', 'Appreciation for benefits received and recognition of positive aspects of life.', 'Coping & Positive Psychology', 'appreciation for benefits', 'Writing down three good things from the day is a gratitude exercise.'),
  t('Signature Strengths & Virtues', "A person's core character strengths that reflect valued virtues and can support well-being.", 'Coping & Positive Psychology', 'core character strengths', 'Kindness, curiosity, bravery, and fairness can be signature strengths.'),
  t('Categories of virtues (wisdom, courage, humanity, justice, temperance, transcendence)', 'The six broad virtue categories in positive psychology: wisdom, courage, humanity, justice, temperance, and transcendence.', 'Coping & Positive Psychology', 'wisdom, courage, humanity, justice, temperance, and transcendence', 'A VIA strengths survey organizes strengths under these virtue categories.', ['categories of virtues']),
];

export const PAIRS = [
  ['Eustress (motivating)', 'Distress (debilitating)'],
  ['Problem-focused coping', 'Emotion-focused coping'],
  ['Alarm reaction phase', 'Resistance phase'],
  ['Resistance phase', 'Exhaustion phase'],
  ['Fight-flight-freeze response', 'Tend-and-befriend theory'],
  ['Subjective Well-being', 'Positive psychology'],
  ['Resilience', 'Posttraumatic Growth'],
];

export const KEY_CONCEPTS = [
  { term: 'General adaptation syndrome (GAS)', why: 'Three-stage stress response — anchors most stress questions.' },
  { term: 'Fight-flight-freeze response', why: 'Default acute stress reaction; pairs with tend-and-befriend on FRQs.' },
  { term: 'Tend-and-befriend theory', why: 'Alternative stress response often contrasted with GAS.' },
  { term: 'Problem-focused coping', why: 'Frequent compare/contrast with emotion-focused coping.' },
  { term: 'Resilience', why: 'Core positive-psychology concept.' },
  { term: 'Posttraumatic Growth', why: 'Often confused with PTSD — opposite direction.' },
];
