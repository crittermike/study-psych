import { unitFactory } from '../_makeTerm';

export const UNIT = 'Social Psychology';
const t = unitFactory(UNIT);

export const TERMS = [
  // Group behavior
  t('Group Polarization', 'The tendency for group discussion to strengthen the dominant initial views of group members.', 'Group Behavior', 'group discussion strengthens dominant views', 'After discussing politics, a group of like-minded friends often hold more extreme views — group polarization.'),
  t('Groupthink', 'A mode of thinking in which the desire for group harmony overrides realistic evaluation of alternatives.', 'Group Behavior', 'desire for harmony overrides evaluation', 'Failures like the Bay of Pigs invasion are often attributed to groupthink.'),
  t('Diffusion of Responsibility', 'The reduced sense of personal responsibility when others are present.', 'Group Behavior', 'reduced personal responsibility with others', 'When many witnesses see an emergency, no one calls — diffusion of responsibility.'),
  t('Social Loafing', 'The tendency to put in less effort when working in a group than when working alone.', 'Group Behavior', 'less effort when in a group', 'A student who slacks on a group project demonstrates social loafing.'),
  t('Deindividuation', 'A loss of self-awareness and self-restraint in group situations that foster anonymity.', 'Group Behavior', 'loss of self-awareness in groups', 'Crowds at riots can show deindividuation when masked.'),
  t('Social Facilitation', 'Improved performance on simple or well-learned tasks in the presence of others.', 'Group Behavior', 'improved performance in front of others', 'A skilled musician plays better with an audience — social facilitation.'),
  t('Social Traps', 'Situations in which individuals pursuing self-interest produce bad outcomes for the group.', 'Group Behavior', 'self-interest harms the group', 'Overfishing a shared lake illustrates a social trap.'),
  t('Superordinate Goals', 'Shared goals that require cooperation and override differences between groups.', 'Group Behavior', 'shared goals requiring cooperation', "In Sherif's Robbers Cave study, a stuck water truck created a superordinate goal."),
  t('Industrial-Organizational (I/O) Psychologists', 'Psychologists who study workplace behavior, motivation, and productivity.', 'Group Behavior', 'study workplace behavior', 'I/O psychologists may design hiring tests or improve job satisfaction.', ['Industrial-organizational psychologists', 'I/O psychologists']),
  t('Burnout', 'A state of emotional, physical, and mental exhaustion caused by prolonged stress, often at work.', 'Group Behavior', 'prolonged stress, exhaustion at work', 'Nurses working long pandemic shifts often experience burnout.'),

  // Prosocial behavior
  t('Altruism', 'Selfless concern for the welfare of others.', 'Prosocial Behavior', 'selfless concern for others', 'Donating a kidney to a stranger is altruism.'),
  t('Prosocial Behavior', 'Voluntary actions intended to help or benefit others.', 'Prosocial Behavior', 'actions intended to help others', 'Holding a door for a stranger is prosocial behavior.'),
  t('Social Debt', 'The sense of owing something in return for help received.', 'Prosocial Behavior', 'owing something in return', 'Feeling pressure to repay a friend\'s favor reflects social debt.'),
  t('Social Reciprocity Norm', 'The expectation that we should help those who help us.', 'Prosocial Behavior', 'help those who help us', 'Returning a favor follows the social reciprocity norm.'),
  t('Social Responsibility Norm', 'The expectation that we should help those who depend on us.', 'Prosocial Behavior', 'help those who depend on us', 'Helping a small child cross the street follows the social responsibility norm.'),
  t('Bystander Effect', 'The tendency for individuals to be less likely to help when others are present.', 'Prosocial Behavior', 'less likely to help when others are present', 'Many bystanders at an accident reduces the chance any one person calls 911.'),
  t('Situational Variables', 'Features of the environment that influence helping behavior, like time pressure or noise.', 'Prosocial Behavior', 'features of the environment that affect helping', 'Being in a hurry is a situational variable that reduces helping.'),
  t('Attentional Variables', 'Factors affecting whether people notice an emergency, such as distraction or focus.', 'Prosocial Behavior', 'whether people notice an emergency', 'Looking at your phone reduces attentional variables that drive helping.'),
  t('False Consensus Effect', 'The tendency to overestimate how much others share our beliefs and behaviors.', 'Prosocial Behavior', 'overestimate how much others share our views', 'Believing "everyone agrees with me" reflects the false consensus effect.'),

  // Attribution & self
  t('Attributions', 'Explanations of the causes of behavior, either internal or external.', 'Attribution & Self', 'explanations for behavior', 'Saying "she failed because she didn\'t study" is an attribution.'),
  t('Dispositional Attributions', 'Explanations that credit behavior to internal traits.', 'Attribution & Self', 'credit behavior to internal traits', '"He\'s rude" is a dispositional attribution.'),
  t('Situational Attributions', 'Explanations that credit behavior to external circumstances.', 'Attribution & Self', 'credit behavior to external circumstances', '"She\'s stressed because of work" is a situational attribution.'),
  t('Explanatory Style', 'A characteristic way of explaining the causes of events in life.', 'Attribution & Self', 'characteristic way of explaining events', 'Always blaming yourself reflects a negative explanatory style.'),
  t('Optimistic Explanatory Style', 'Attributing failures to external, temporary, specific causes and successes to internal causes.', 'Attribution & Self', 'failures external, successes internal', 'An optimist who fails a test thinks "this test was unusual" — optimistic explanatory style.'),
  t('Pessimistic Explanatory Style', 'Attributing failures to internal, stable, global causes.', 'Attribution & Self', 'failures internal, stable, global', 'A pessimist who fails thinks "I\'m bad at everything" — pessimistic explanatory style.'),
  t('Actor/Observer Bias', 'The tendency to attribute our own behavior to situations and others\' behavior to traits.', 'Attribution & Self', "our behavior to situations, others' to traits", '"I tripped because the floor is uneven, but he tripped because he\'s clumsy" — actor/observer bias.'),
  t('Fundamental Attribution Error', 'The tendency to overestimate dispositional causes of others\' behavior and underestimate situational ones.', 'Attribution & Self', "overestimate disposition in others' behavior", 'Calling a slow driver a jerk without considering they may be lost is the fundamental attribution error.'),
  t('Self-Serving Bias', 'The tendency to take credit for successes and blame failures on external factors.', 'Attribution & Self', 'credit successes, blame failures externally', 'Saying "I aced the test because I\'m smart" but "I failed because the test was unfair" is self-serving bias.'),
  t('Internal Locus of Control', 'The belief that you control your own outcomes.', 'Attribution & Self', 'you control your own outcomes', "A student who believes effort determines grades has an internal locus of control."),
  t('External Locus of Control', 'The belief that outcomes are controlled by luck, fate, or others.', 'Attribution & Self', 'outcomes controlled by luck or fate', '"I failed because the teacher hates me" reflects an external locus of control.'),
  t('Mere Exposure Effect', 'The tendency to like things more after repeated exposure to them.', 'Attribution & Self', 'liking from repeated exposure', 'Hearing a song many times can make you like it — mere exposure effect.'),
  t('Self-Fulfilling Prophecy', 'A belief that leads to behavior that makes the belief come true.', 'Attribution & Self', 'belief that brings itself about', 'A teacher who expects students to fail may treat them in ways that produce failure.'),
  t('Social Comparison', 'Evaluating ourselves by comparing to others.', 'Attribution & Self', 'evaluating ourselves vs. others', 'Comparing your salary to a coworker\'s is social comparison.'),
  t('Upward Social Comparison', 'Comparing oneself to people who seem better off.', 'Attribution & Self', 'comparing to people better off', 'Looking at influencers and feeling worse is upward social comparison.'),
  t('Downward Social Comparison', 'Comparing oneself to people who seem worse off.', 'Attribution & Self', 'comparing to people worse off', '"At least I\'m not failing" is downward social comparison.'),
  t('Relative Deprivation', 'The perception that you are worse off than others to whom you compare yourself.', 'Attribution & Self', 'perception of being worse off than others', 'Feeling poor next to wealthier neighbors reflects relative deprivation.'),

  // Stereotyping & prejudice
  t('Stereotype', 'A generalized belief about a group of people.', 'Stereotyping & Prejudice', 'generalized belief about a group', 'Believing all teens are reckless drivers is a stereotype.'),
  t('Cognitive Load', 'The amount of mental effort being used in working memory.', 'Stereotyping & Prejudice', 'amount of mental effort', 'Heavy cognitive load can make us rely more on stereotypes.'),
  t('Prejudice', 'A negative attitude toward a group based on stereotypes.', 'Stereotyping & Prejudice', 'negative attitude toward a group', 'Disliking a group before meeting any members is prejudice.'),
  t('Discrimination', 'Negative behavior directed at members of a group.', 'Stereotyping & Prejudice', 'negative behavior toward a group', 'Refusing to hire someone based on race is discrimination.'),
  t('Implicit Attitudes', 'Unconscious beliefs that influence judgments and behavior.', 'Stereotyping & Prejudice', 'unconscious beliefs', 'The Implicit Association Test attempts to measure implicit attitudes.'),
  t('Just-World Phenomenon', 'The belief that the world is fair and people get what they deserve.', 'Stereotyping & Prejudice', 'world is fair, people get what they deserve', 'Blaming victims for bad luck reflects the just-world phenomenon.'),
  t('Out-Group Homogeneity Bias', 'The tendency to see members of other groups as more similar to each other than they really are.', 'Stereotyping & Prejudice', 'other groups as more similar', '"They all act the same" reflects out-group homogeneity bias.'),
  t('In-Group Bias', 'The tendency to favor one\'s own group.', 'Stereotyping & Prejudice', "favor one's own group", 'Cheering for your school\'s team because they\'re yours is in-group bias.'),
  t('Ethnocentrism', "Judging other cultures by the standards of one's own.", 'Stereotyping & Prejudice', "judging others by one's own standards", 'Calling another culture\'s food "weird" can be ethnocentric.'),
  t('Belief Perseverance', 'Holding onto beliefs even after they have been disproven.', 'Stereotyping & Prejudice', 'holding beliefs even after being disproven', 'Continuing to believe a debunked rumor shows belief perseverance.'),

  // Attitudes & persuasion
  t('Cognitive Dissonance', 'Psychological discomfort caused by holding inconsistent beliefs and behaviors.', 'Attitudes & Persuasion', 'discomfort from inconsistent beliefs', 'Smoking while believing it\'s harmful causes cognitive dissonance.'),
  t('Social Norms', 'Accepted standards of behavior within a group or culture.', 'Attitudes & Persuasion', 'accepted standards of behavior', 'Tipping at restaurants is a social norm in the U.S.'),
  t('Social Influence Theory', 'A theory describing how others\' real or imagined presence shapes our behavior.', 'Attitudes & Persuasion', "how others' presence shapes behavior", 'Social influence theory explains both conformity and persuasion.'),
  t('Normative Social Influence', 'Conforming to fit in or be accepted, not necessarily because of belief.', 'Attitudes & Persuasion', 'conforming to fit in', 'Wearing what classmates wear to fit in is normative social influence.'),
  t('Informational Social Influence', 'Conforming because we believe others have accurate information.', 'Attitudes & Persuasion', 'conforming because others know more', 'Following others to a fire exit you can\'t see is informational social influence.'),
  t('Persuasion', 'The process of changing attitudes or behaviors through communication.', 'Attitudes & Persuasion', 'changing attitudes through communication', 'Ads attempt persuasion to change buying habits.'),
  t('Elaboration Likelihood Model', 'A model proposing two routes to persuasion: central and peripheral.', 'Attitudes & Persuasion', 'two routes to persuasion', 'The elaboration likelihood model includes the central and peripheral routes.'),
  t('Central Route', 'A persuasion path that uses logic, evidence, and careful thinking.', 'Attitudes & Persuasion', 'logic, evidence, careful thinking', 'A detailed policy debate uses the central route.'),
  t('Peripheral Route', 'A persuasion path that relies on superficial cues like attractiveness.', 'Attitudes & Persuasion', 'superficial cues', 'A celebrity endorsement uses the peripheral route.'),
  t('Halo Effect', 'A cognitive bias where one positive trait shapes overall impression.', 'Attitudes & Persuasion', 'one positive trait shapes overall impression', 'Assuming an attractive person is also smart is the halo effect.'),
  t('Foot-in-the-Door Technique', 'Getting a small request agreed to first to make a bigger request more likely.', 'Attitudes & Persuasion', 'small request first, bigger after', 'A volunteer who agrees to a yard sign may later agree to host an event.'),
  t('Door-in-the-Face Technique', 'Starting with a large request that is refused to make a smaller one more likely.', 'Attitudes & Persuasion', 'large request first, then smaller', 'Asking for a $100 donation, then settling for $20, uses door-in-the-face.'),

  // Social influence
  t('Conformity', 'Adjusting behavior or thinking to match a group standard.', 'Social Influence', 'matching a group standard', 'Asch\'s line study showed people conform even when wrong.'),
  t('Obedience', 'Complying with the demands of an authority figure.', 'Social Influence', 'complying with authority', "Milgram's shock study demonstrated obedience to authority."),
  t('Collectivism', 'A cultural orientation that prioritizes the goals of the group over the individual.', 'Social Influence', 'group goals over individual goals', 'Many East Asian cultures emphasize collectivism.'),
  t('Multiculturalism', 'The coexistence and respect of multiple cultural groups within a society.', 'Social Influence', 'coexistence of multiple cultures', 'A multicultural city celebrates many holidays and traditions.'),
];

export const PAIRS = [
  ['Group Polarization', 'Groupthink'],
  ['Social Loafing', 'Social Facilitation'],
  ['Diffusion of Responsibility', 'Bystander Effect'],
  ['Altruism', 'Prosocial Behavior'],
  ['Social Reciprocity Norm', 'Social Responsibility Norm'],
  ['Dispositional Attributions', 'Situational Attributions'],
  ['Optimistic Explanatory Style', 'Pessimistic Explanatory Style'],
  ['Internal Locus of Control', 'External Locus of Control'],
  ['Upward Social Comparison', 'Downward Social Comparison'],
  ['Fundamental Attribution Error', 'Self-Serving Bias'],
  ['Prejudice', 'Discrimination'],
  ['In-Group Bias', 'Out-Group Homogeneity Bias'],
  ['Normative Social Influence', 'Informational Social Influence'],
  ['Central Route', 'Peripheral Route'],
  ['Foot-in-the-Door Technique', 'Door-in-the-Face Technique'],
  ['Conformity', 'Obedience'],
  ['Collectivism', 'Multiculturalism'],
  ['Stereotype', 'Prejudice'],
];

export const KEY_CONCEPTS = [
  { term: 'Fundamental Attribution Error', why: 'One of the most-tested social psych concepts.' },
  { term: 'Cognitive Dissonance', why: 'Festinger\'s classic — central to attitude change FRQs.' },
  { term: 'Bystander Effect', why: 'Iconic Kitty Genovese study, often paired with diffusion of responsibility.' },
  { term: 'Conformity', why: 'Asch line study — top study to know.' },
  { term: 'Obedience', why: 'Milgram is one of the most cited studies in psych.' },
  { term: 'Groupthink', why: 'Common scenario — pairs with group polarization.' },
  { term: 'Self-Fulfilling Prophecy', why: 'High-yield concept that crosses social and educational psych.' },
  { term: 'Foot-in-the-Door Technique', why: 'Persuasion classic — pairs with door-in-the-face.' },
  { term: 'Just-World Phenomenon', why: 'Common in scenarios involving victim blaming.' },
];
