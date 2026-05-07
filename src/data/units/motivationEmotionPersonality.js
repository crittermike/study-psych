import { unitFactory } from '../_makeTerm';

export const UNIT = 'Motivation, Emotion & Personality';
const t = unitFactory(UNIT);

export const TERMS = [
  // Motivation theories
  t('Instincts', 'Innate, fixed patterns of behavior that occur in response to certain stimuli.', 'Motivation Theories', 'innate, fixed patterns of behavior', 'A bird building a nest follows an instinct.'),
  t('Drive-Reduction Theory', 'A theory that physiological needs create internal drives that motivate us to reduce them.', 'Motivation Theories', 'needs create drives we reduce', 'Hunger drives us to eat — drive-reduction theory.'),
  t('Homeostasis', 'The body\'s tendency to maintain a balanced internal state.', 'Motivation Theories', 'maintaining balanced internal state', 'Sweating to cool down maintains homeostasis.'),
  t('Belongingness', 'The fundamental human need to form and maintain interpersonal connections.', 'Motivation Theories', 'need to form connections', 'Joining clubs satisfies belongingness.'),
  t('Arousal Theory', 'The idea that we are motivated to maintain an optimal level of arousal.', 'Motivation Theories', 'maintain optimal arousal', 'Seeking activity when bored fits arousal theory.'),
  t('Yerkes-Dodson Law', 'The principle that performance is best at moderate levels of arousal.', 'Motivation Theories', 'best performance at moderate arousal', 'Mild test anxiety can boost performance, but too much hurts it.'),
  t('Sensation-Seeking Theory', 'The view that some people have a stronger drive for varied, novel, intense experiences.', 'Motivation Theories', 'drive for varied, novel experiences', 'Skydiving fans score high on sensation seeking.'),
  t('Thrill Seeking', 'A facet of sensation seeking focused on risky physical activities.', 'Motivation Theories', 'risky physical activities', 'Bungee jumping reflects thrill seeking.'),
  t('Adventure Seeking', 'A facet of sensation seeking focused on novel experiences and exploration.', 'Motivation Theories', 'novel experiences and exploration', 'Backpacking through new countries reflects adventure seeking.'),
  t('Disinhibition', 'A facet of sensation seeking shown by social and behavioral risk-taking.', 'Motivation Theories', 'social and behavioral risk-taking', 'Wild parties reflect disinhibition.'),
  t('Boredom Susceptibility', 'A facet of sensation seeking marked by intolerance of routine.', 'Motivation Theories', 'intolerance of routine', 'Quickly tiring of repetitive jobs reflects boredom susceptibility.'),
  t('Incentive Theory', 'The idea that behavior is pulled by external rewards or pushed away from punishments.', 'Motivation Theories', 'pulled by external rewards', 'Working harder for a bonus fits incentive theory.'),
  t('Extrinsic Motivation', 'Motivation driven by external rewards or pressures.', 'Motivation Theories', 'driven by external rewards', 'Studying just for the grade is extrinsic motivation.'),
  t('Self-Determination Theory', 'The theory that we are motivated by needs for autonomy, competence, and relatedness.', 'Motivation Theories', 'autonomy, competence, relatedness', 'A teacher who supports student choice taps into self-determination theory.'),
  t('Intrinsic Motivation', 'Motivation driven by internal interest or enjoyment.', 'Motivation Theories', 'internal interest or enjoyment', 'Reading for fun is intrinsic motivation.'),

  // Conflict & approach
  t("Lewin's Motivational Conflicts Theory", "Kurt Lewin's theory describing different types of approach-avoidance conflicts.", 'Conflict & Approach', 'types of approach-avoidance conflicts', "Lewin's theory includes approach-approach, avoidance-avoidance, and approach-avoidance conflicts."),
  t('Approach-Approach Conflicts', 'A conflict between two desirable choices.', 'Conflict & Approach', 'two desirable choices', 'Choosing between two job offers is an approach-approach conflict.'),
  t('Avoidance-Avoidance Conflicts', 'A conflict between two undesirable choices.', 'Conflict & Approach', 'two undesirable choices', 'Choosing between studying or doing chores is an avoidance-avoidance conflict.'),
  t('Approach-Avoidance Conflicts', 'A conflict involving one option with both attractive and unattractive features.', 'Conflict & Approach', 'attractive and unattractive features', 'A high-paying but stressful job is an approach-avoidance conflict.'),

  // Emotion
  t('Emotion', 'A complex psychological state involving physiology, expression, and feeling.', 'Emotion', 'physiology, expression, and feeling', 'Fear includes a racing heart, a startled face, and feeling scared.'),
  t('Affect', 'The outward expression of feelings or emotion.', 'Emotion', 'outward expression of feelings', 'A flat affect describes minimal emotional display.'),
  t('Facial-Feedback Hypothesis', 'The idea that facial expressions can influence emotional experience.', 'Emotion', 'facial expressions influence emotion', 'Holding a pencil to force a smile can boost mood — facial-feedback hypothesis.'),
  t('Display Rules', 'Cultural norms about when and how to show emotions.', 'Emotion', 'cultural norms about showing emotions', 'In some cultures, public displays of grief are limited — display rules.'),
  t('Elicitors', 'Triggers in the environment that cause specific emotions.', 'Emotion', 'triggers that cause emotions', 'A loud noise is an elicitor of startle.'),
  t('Broaden-and-Build Theory of Emotion', 'The theory that positive emotions broaden thinking and build resources over time.', 'Emotion', 'positive emotions broaden thinking', 'Happiness can spark creativity — broaden-and-build theory.'),
  t('Universal Emotions', 'Basic emotions recognized across cultures, like happiness, sadness, fear, anger, surprise, disgust.', 'Emotion', 'basic emotions across cultures', 'Ekman identified universal emotions seen in many cultures.'),

  // Psychodynamic personality
  t('Psychodynamic Theory', "Freud's view that personality is shaped by unconscious drives and early experiences.", 'Psychodynamic Personality', 'unconscious drives and early experiences', 'Psychodynamic theory emphasizes unconscious motives.'),
  t('Preconscious Mind', 'Thoughts that are not currently conscious but can be brought into awareness.', 'Psychodynamic Personality', 'not conscious but accessible', 'Remembering what you ate for breakfast taps preconscious memory.'),
  t('Unconscious Mind', "Freud's term for thoughts and feelings outside conscious awareness.", 'Psychodynamic Personality', 'thoughts outside conscious awareness', 'Repressed memories live in the unconscious mind, per Freud.'),
  t('Denial', 'A defense mechanism of refusing to accept reality.', 'Psychodynamic Personality', 'refusing to accept reality', 'Insisting a lost loved one is still alive can be denial.'),
  t('Displacement', 'A defense mechanism of redirecting impulses to a safer target.', 'Psychodynamic Personality', 'redirecting impulses to a safer target', 'Yelling at family after a bad day at work is displacement.'),
  t('Projection', 'A defense mechanism of attributing one\'s own unacceptable feelings to others.', 'Psychodynamic Personality', "attributing one's feelings to others", 'Accusing others of being angry when you are angry is projection.'),
  t('Rationalization', 'A defense mechanism of providing logical-sounding excuses for behavior.', 'Psychodynamic Personality', 'logical-sounding excuses', 'Telling yourself a missed promotion was for the best is rationalization.'),
  t('Reaction Formation', 'A defense mechanism of expressing the opposite of one\'s true feelings.', 'Psychodynamic Personality', "expressing the opposite of true feelings", 'Being overly nice to someone you dislike is reaction formation.'),
  t('Regression', 'A defense mechanism of reverting to behaviors of an earlier developmental stage.', 'Psychodynamic Personality', 'reverting to earlier behaviors', 'A stressed adult thumb-sucking is regression.'),
  t('Repression', 'A defense mechanism of pushing painful memories out of awareness.', 'Psychodynamic Personality', 'pushing memories out of awareness', 'Forgetting a traumatic event entirely could be repression.'),
  t('Sublimation', 'A defense mechanism of channeling unacceptable impulses into productive activities.', 'Psychodynamic Personality', 'channeling impulses into productive activities', 'Channeling aggression into sports is sublimation.'),

  // Humanistic & social-cognitive personality
  t('Humanistic Psychology', 'A perspective emphasizing personal growth, free will, and self-actualization.', 'Humanistic Personality', 'personal growth, free will', 'Humanistic psychology focuses on what makes life meaningful.'),
  t('Unconditional Regard', 'Acceptance and support given without conditions, central to Rogers\' humanistic theory.', 'Humanistic Personality', 'acceptance without conditions', 'A therapist who shows unconditional regard accepts the client no matter what.'),
  t('Self-Actualizing Tendency', 'The drive to fulfill one\'s potential, central to humanistic psychology.', 'Humanistic Personality', "drive to fulfill one's potential", "Maslow's hierarchy ends with the self-actualizing tendency."),
  t('Social-Cognitive Theory', "Bandura's theory that personality reflects an interaction of behavior, thought, and environment.", 'Humanistic Personality', 'interaction of behavior, thought, environment', 'Social-cognitive theory uses reciprocal determinism.'),
  t('Reciprocal Determinism', 'The idea that behavior, personal factors, and environment interact and influence one another.', 'Humanistic Personality', 'behavior, person, and environment interact', "A child's shyness, family, and school all influence each other — reciprocal determinism."),
  t('Self-Concept', 'The collection of beliefs we hold about ourselves.', 'Humanistic Personality', 'beliefs we hold about ourselves', 'Seeing yourself as creative is part of your self-concept.'),
  t('Self-Efficacy', 'A belief in one\'s ability to succeed at specific tasks.', 'Humanistic Personality', "belief in one's ability to succeed", 'A student confident they can pass the AP exam has high self-efficacy.'),
  t('Self-Esteem', 'A person\'s overall sense of self-worth.', 'Humanistic Personality', "overall sense of self-worth", 'Feeling good about yourself overall reflects high self-esteem.'),

  // Trait theories
  t('Trait Theories', 'Approaches to personality that focus on identifying enduring characteristics.', 'Trait Personality', 'enduring characteristics', 'Trait theories include the Big Five.'),
  t('Big Five Theory', 'A trait theory describing personality along five broad dimensions: OCEAN.', 'Trait Personality', 'five broad dimensions: OCEAN', 'The Big Five Theory uses Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.'),
  t('Personality Inventories', 'Self-report questionnaires used to assess personality traits.', 'Trait Personality', 'self-report personality questionnaires', 'The MMPI is a personality inventory.'),
  t('Factor Analysis', 'A statistical technique that identifies clusters of related items, used to find personality dimensions.', 'Trait Personality', 'statistical clusters of related items', 'Factor analysis was used to identify the Big Five traits.'),
  t('Openness to Experience', 'A Big Five trait reflecting imagination, curiosity, and willingness to try new things.', 'Trait Personality', 'imagination, curiosity, openness', 'A friend who loves new music genres scores high on openness.'),
  t('Conscientiousness', 'A Big Five trait reflecting organization, dependability, and self-discipline.', 'Trait Personality', 'organization, self-discipline', 'A meticulous planner scores high on conscientiousness.'),
  t('Extraversion', 'A Big Five trait reflecting sociability, assertiveness, and enthusiasm.', 'Trait Personality', 'sociability, assertiveness', 'Loving big parties reflects high extraversion.'),
  t('Agreeableness', 'A Big Five trait reflecting kindness, cooperation, and trust.', 'Trait Personality', 'kindness and cooperation', 'A good friend who avoids conflict is high in agreeableness.'),
  t('Emotional Stability', 'A Big Five trait reflecting calmness and resilience to stress (the opposite pole of neuroticism).', 'Trait Personality', 'calmness, resilience to stress', 'Staying calm under pressure shows emotional stability.'),
];

export const PAIRS = [
  ['Drive-Reduction Theory', 'Arousal Theory'],
  ['Drive-Reduction Theory', 'Incentive Theory'],
  ['Intrinsic Motivation', 'Extrinsic Motivation'],
  ['Approach-Approach Conflicts', 'Avoidance-Avoidance Conflicts'],
  ['Approach-Approach Conflicts', 'Approach-Avoidance Conflicts'],
  ['Emotion', 'Affect'],
  ['Facial-Feedback Hypothesis', 'Broaden-and-Build Theory of Emotion'],
  ['Denial', 'Repression'],
  ['Displacement', 'Sublimation'],
  ['Projection', 'Reaction Formation'],
  ['Self-Concept', 'Self-Esteem'],
  ['Self-Efficacy', 'Self-Esteem'],
  ['Psychodynamic Theory', 'Humanistic Psychology'],
  ['Humanistic Psychology', 'Social-Cognitive Theory'],
  ['Trait Theories', 'Big Five Theory'],
  ['Openness to Experience', 'Conscientiousness'],
  ['Extraversion', 'Agreeableness'],
];

export const KEY_CONCEPTS = [
  { term: 'Drive-Reduction Theory', why: 'Foundational motivation theory — pairs with arousal and incentive.' },
  { term: 'Yerkes-Dodson Law', why: 'Classic graph question on test anxiety/arousal.' },
  { term: 'Self-Determination Theory', why: 'Autonomy/competence/relatedness — modern motivation favorite.' },
  { term: 'Intrinsic Motivation', why: 'Always paired with extrinsic on FRQs.' },
  { term: 'Facial-Feedback Hypothesis', why: 'Top-tested theory of emotion.' },
  { term: 'Universal Emotions', why: 'Ekman\'s research — easy MCQ trap.' },
  { term: 'Reciprocal Determinism', why: 'Bandura\'s big idea — central to social-cognitive personality.' },
  { term: 'Big Five Theory', why: 'OCEAN is the dominant personality framework today.' },
  { term: 'Self-Efficacy', why: 'Bandura\'s second classic — common scenario question.' },
  { term: 'Repression', why: 'Most-tested defense mechanism — pairs well with denial.' },
];
