import { unitFactory } from '../_makeTerm';

export const UNIT = 'Science Practices';
const t = unitFactory(UNIT);

export const TERMS = [
  // Theoretical perspectives
  t('Psychodynamic Perspective', 'A perspective that emphasizes unconscious motives, conflicts, and early childhood experiences as drivers of behavior.', 'Psychological Perspectives', 'unconscious motives', 'A psychodynamic psychologist might link a fear of authority to early relationships with a parent.'),
  t('Behavioral Perspective', 'A perspective that focuses on how observable behavior is learned through conditioning and reinforcement.', 'Psychological Perspectives', 'observable behavior', 'A behaviorist explains nail-biting as a habit reinforced by stress relief.'),
  t('Humanistic Perspective', 'A perspective emphasizing personal growth, free will, and the drive to reach one\'s potential.', 'Psychological Perspectives', 'personal growth and free will', 'A humanist focuses on a client\'s strengths and self-worth.'),
  t('Cognitive Perspective', 'A perspective that examines how mental processes such as thinking, memory, and perception shape behavior.', 'Psychological Perspectives', 'mental processes', 'A cognitive psychologist studies how distorted thinking maintains anxiety.'),
  t('Biological Perspective', 'A perspective that explains behavior through genes, brain structures, neurotransmitters, and physiology.', 'Psychological Perspectives', 'genes, brain structures, and physiology', 'A biological psychologist studies how serotonin levels relate to depression.'),
  t('Evolutionary Perspective', 'A perspective that explains behavior as the product of traits shaped by natural selection.', 'Psychological Perspectives', 'natural selection', 'Fear of snakes may persist because it once helped ancestors survive.'),
  t('Sociocultural Perspective', 'A perspective that examines how culture, society, and group membership shape thoughts and behavior.', 'Psychological Perspectives', 'culture, society, and group membership', 'A sociocultural psychologist studies how individualist cultures emphasize personal achievement.'),
  t('Biopsychosocial Perspective', 'An integrated approach that considers biological, psychological, and social influences on behavior.', 'Psychological Perspectives', 'biological, psychological, and social', 'A biopsychosocial view of addiction combines genetics, coping skills, and peer influence.'),

  // Foundations
  t('Psychology', 'The scientific study of behavior and mental processes.', 'Foundations of Psychology', 'behavior and mental processes', 'A psychology class covers everything from neurons to social influence.'),
  t('Mental Processes', 'Internal activities such as thinking, feeling, perceiving, and remembering that cannot be directly observed.', 'Foundations of Psychology', 'internal activities', 'Daydreaming and problem-solving are mental processes.'),
  t('Behavior', 'Any observable action of a person or animal.', 'Foundations of Psychology', 'observable action', 'Smiling, running, and answering a question are behaviors.'),

  // Cognitive biases researchers must guard against
  t('Confirmation Bias', 'The tendency to seek, interpret, or remember information that supports existing beliefs.', 'Cognitive Biases (Research)', 'supports existing beliefs', 'A researcher who only counts evidence agreeing with their hypothesis shows confirmation bias.'),
  t('Hindsight Bias', 'The tendency to believe, after learning an outcome, that one would have predicted it.', 'Cognitive Biases (Research)', 'would have predicted it', 'After a game ends, fans often say "I knew that team would win" — that\'s hindsight bias.'),
  t('Overconfidence', 'The tendency to overestimate the accuracy of one\'s knowledge or judgments.', 'Cognitive Biases (Research)', 'overestimate the accuracy', 'A student certain of an answer may actually have it wrong because of overconfidence.'),

  // Research process
  t('Empirical Evidence', 'Information gathered through systematic observation, measurement, or experiment.', 'Research Process', 'systematic observation', 'A psychologist relies on empirical evidence rather than intuition.'),
  t('Scientific Method', 'A systematic process of forming hypotheses, collecting data, and revising theories based on evidence.', 'Research Process', 'systematic process', 'Researchers use the scientific method to test whether a study skill improves recall.'),
  t('Hypothesis', 'A testable prediction about the relationship between variables.', 'Research Process', 'testable prediction', '"Students who sleep 8 hours score higher on tests" is a hypothesis.'),
  t('Falsifiable', 'The quality of a claim that allows it to be proven wrong by evidence.', 'Research Process', 'proven wrong by evidence', 'A hypothesis must be falsifiable to be scientifically useful.'),
  t('Peer Review', 'The process in which other experts evaluate research before publication.', 'Research Process', 'other experts evaluate', 'Peer review helps catch errors before a study reaches a journal.'),
  t('Replication', 'Repeating a study to see whether the same results occur.', 'Research Process', 'repeating a study', 'A finding becomes more credible when independent researchers replicate it.'),
  t('Reliability', 'The consistency of a measure or finding across time or contexts.', 'Research Process', 'consistency of a measure', 'A reliable bathroom scale gives the same weight twice in a row.'),
  t('Validity', 'The extent to which a measure or test actually measures what it claims to measure.', 'Research Process', 'actually measures what it claims', 'A valid intelligence test should predict things linked to intelligence.'),
  t('The American Psychological Association (APA)', 'The largest professional organization for psychologists in the United States, which sets ethics and publication standards.', 'Research Process', 'professional organization', 'The APA publishes ethics codes that researchers must follow.', ['American Psychological Association', 'APA']),
  t('Research Design', 'The overall plan that specifies how a study will be carried out.', 'Research Process', 'overall plan', 'A solid research design specifies who will be studied, what will be measured, and how.'),
  t('Methodology', 'The specific procedures and techniques used to collect and analyze data.', 'Research Process', 'specific procedures', 'A study\'s methodology section details how participants were tested.'),
  t('Quantitative Data', 'Numerical data that can be measured and analyzed statistically.', 'Research Process', 'numerical data', 'Test scores and reaction times are quantitative data.'),
  t('Qualitative Data', 'Non-numerical data such as descriptions, narratives, or themes.', 'Research Process', 'non-numerical data', 'Interview responses about feelings are qualitative data.'),

  // Research methods
  t('Likert Scales', 'Rating scales that let participants indicate level of agreement, often from "strongly disagree" to "strongly agree".', 'Research Methods', 'rating scales', 'A 5-point Likert scale captures attitudes toward a new policy.'),
  t('Structured Interviews', 'Interviews using a fixed set of questions in a fixed order.', 'Research Methods', 'fixed set of questions', 'A structured interview lets researchers compare answers across many participants.'),
  t('Survey Technique', 'A method of collecting self-reported data from many people using a set of standard questions.', 'Research Methods', 'self-reported data', 'A national survey may ask about voting habits and beliefs.'),
  t('Wording Effect', 'The way the phrasing of a question can influence respondents\' answers.', 'Research Methods', 'phrasing of a question', 'Asking "Do you support the ban?" vs. "Do you support the freedom?" can produce different results.'),
  t('Social Desirability Bias', 'The tendency for respondents to answer in ways they believe are socially acceptable.', 'Research Methods', 'socially acceptable', 'People may underreport unhealthy habits to seem more responsible.'),
  t('Naturalistic Observation', 'A research method that observes behavior in its natural setting without interference.', 'Research Methods', 'natural setting without interference', 'A psychologist watching kids play at recess is doing naturalistic observation.'),
  t('Case Study', 'An in-depth investigation of a single person, group, or event.', 'Research Methods', 'in-depth investigation of a single', 'A case study of a patient with brain damage can reveal how a brain area functions.'),
  t('Correlational Research', 'Research that measures the strength and direction of the relationship between two variables without manipulating them.', 'Research Methods', 'relationship between two variables', 'A study finding that more sleep is linked to better grades is correlational.'),
  t('Third Variable Problem', 'When an unmeasured variable is responsible for a relationship between two other variables.', 'Research Methods', 'unmeasured variable', 'Ice cream sales and drowning both rise in summer because of heat — a third variable.'),
  t('Scatterplot', 'A graph that shows the relationship between two variables with each dot as one observation.', 'Research Methods', 'graph that shows the relationship', 'A scatterplot with an upward slope suggests a positive correlation.'),
  t('Correlation Coefficient', 'A number from -1 to +1 that describes the strength and direction of a correlation.', 'Research Methods', 'strength and direction', 'A correlation coefficient of +0.8 shows a strong positive relationship.'),
  t('Positive Correlation', 'A relationship in which two variables move in the same direction.', 'Research Methods', 'move in the same direction', 'More study time and higher grades show a positive correlation.'),
  t('Negative Correlation', 'A relationship in which two variables move in opposite directions.', 'Research Methods', 'move in opposite directions', 'More absences and lower grades show a negative correlation.'),

  // Variables & experiments
  t('Experimental Method', 'A research approach that manipulates an independent variable to test its effect on a dependent variable.', 'Variables & Experiments', 'manipulates an independent variable', 'A study that gives some students caffeine and measures recall is using the experimental method.'),
  t('Independent Variable', 'The variable manipulated by the experimenter to test its effect.', 'Variables & Experiments', 'variable manipulated', 'In a sleep study, hours of sleep is the independent variable.'),
  t('Dependent Variable', 'The variable measured to see how it is affected by the independent variable.', 'Variables & Experiments', 'variable measured', 'Test scores are the dependent variable in a study on sleep and learning.'),
  t('Confounding Variable', 'An unintended variable that could influence the dependent variable along with the independent variable.', 'Variables & Experiments', 'unintended variable', 'If only morning students get caffeine, time of day is a confounding variable.'),
  t('Operational Definitions', 'Precise descriptions of how variables will be measured or manipulated.', 'Variables & Experiments', 'precise descriptions', '"Stress" might be operationally defined as a score on a stress scale.'),
  t('Experimental Group', 'The group that receives the independent variable or treatment.', 'Variables & Experiments', 'receives the independent variable', 'Participants given the new drug are the experimental group.'),
  t('Control Group', 'The group that does not receive the experimental treatment, used as a baseline.', 'Variables & Experiments', 'baseline', 'Participants given a sugar pill instead of the drug are the control group.'),
  t('Random Assignment', 'Placing participants into experimental or control groups by chance.', 'Variables & Experiments', 'by chance', 'Flipping a coin to decide who gets the treatment is random assignment.'),
  t('Placebo Effect', 'A change in behavior or symptoms that results from expectations rather than from the treatment.', 'Variables & Experiments', 'expectations rather than treatment', 'A patient feeling better after a sugar pill is showing the placebo effect.'),
  t('Experimenter Bias', 'When a researcher\'s expectations unintentionally influence study results.', 'Variables & Experiments', "researcher's expectations", 'A teacher who expects high scores may grade leniently, showing experimenter bias.'),
  t('Single-Blind Study', 'A study in which participants do not know which group they are in.', 'Variables & Experiments', 'participants do not know', 'Patients in a drug trial often do not know if they got the drug or placebo.'),
  t('Double-Blind Study', 'A study in which neither participants nor researchers know who is in which group.', 'Variables & Experiments', 'neither participants nor researchers know', 'A double-blind drug trial reduces both placebo and experimenter bias.'),
  t('Placebo Condition', 'A condition in which participants receive an inactive substance or sham treatment for comparison.', 'Variables & Experiments', 'inactive substance or sham treatment', 'A placebo condition lets researchers separate drug effects from expectation.'),

  // Sampling
  t('Sample', 'The group of participants selected from the population to take part in a study.', 'Sampling', 'group of participants', 'A study of 200 high school seniors is using a sample.'),
  t('Representative Sample', 'A sample that closely reflects the characteristics of the larger population.', 'Sampling', 'reflects the larger population', 'A representative national sample mirrors the country in age, gender, and region.'),
  t('Random Sample', 'A sample in which every member of the population has an equal chance of being chosen.', 'Sampling', 'equal chance of being chosen', 'Drawing names from a hat creates a random sample.'),
  t('Sample Bias', 'A flaw in the sampling process that makes the sample unrepresentative.', 'Sampling', 'unrepresentative sample', 'Surveying only college students about adult opinions creates sample bias.'),
  t('Generalizability', 'The extent to which study results can be applied to people or settings beyond the sample.', 'Sampling', 'applied beyond the sample', 'Findings from a tiny college sample have limited generalizability.'),

  // Statistics
  t('Statistics', 'The branch of math used to organize, summarize, and interpret data.', 'Statistics', 'organize, summarize, and interpret data', 'Psychologists use statistics to test whether their results are meaningful.'),
  t('Descriptive Statistics', 'Statistics that summarize and describe the characteristics of a data set.', 'Statistics', 'summarize and describe', 'Mean, median, and mode are descriptive statistics.'),
  t('Inferential Statistics', 'Statistics used to draw conclusions about populations from sample data.', 'Statistics', 'draw conclusions about populations', 'A t-test is an inferential statistic that compares two groups.'),
  t('Measure of Central Tendency', 'A single number that represents the center of a data set, such as mean, median, or mode.', 'Statistics', 'center of a data set', 'Reporting a class\'s average score uses a measure of central tendency.'),
  t('Mean', 'The arithmetic average of a set of numbers.', 'Statistics', 'arithmetic average', 'The mean of 4, 6, and 8 is 6.'),
  t('Median', 'The middle value when data are arranged in order.', 'Statistics', 'middle value', 'In the data 2, 5, 9, the median is 5.'),
  t('Mode', 'The most frequently occurring value in a data set.', 'Statistics', 'most frequently occurring', 'In 3, 3, 5, 7, the mode is 3.'),
  t('Range', 'The difference between the highest and lowest scores in a data set.', 'Statistics', 'highest minus lowest', 'In 4 to 9, the range is 5.'),
  t('Normal Curve', 'A symmetrical, bell-shaped distribution where most scores cluster around the mean.', 'Statistics', 'bell-shaped distribution', 'IQ scores roughly follow a normal curve.'),
  t('Regression to the Mean', 'The tendency for extreme scores to move closer to the average on a second measurement.', 'Statistics', 'closer to the average', 'A student who scored unusually high once is likely to score closer to their typical level next time.'),
  t('Positive Skew', 'A distribution with a long tail on the high end, pulling the mean above the median.', 'Statistics', 'long tail on the high end', 'Income data often shows positive skew because of a few very high earners.'),
  t('Negative Skew', 'A distribution with a long tail on the low end, pulling the mean below the median.', 'Statistics', 'long tail on the low end', 'An easy test where most students score high but a few score very low has negative skew.'),
  t('Standard Deviation', 'A measure of how spread out scores are around the mean.', 'Statistics', 'spread out scores', 'A small standard deviation means scores are clustered tightly around the mean.'),
  t('Percentile Rank', 'The percentage of scores that fall at or below a given score.', 'Statistics', 'percentage of scores at or below', 'A percentile rank of 80 means you scored higher than 80% of test-takers.'),
  t('Bimodal Distribution', 'A distribution with two distinct peaks.', 'Statistics', 'two distinct peaks', 'Test scores split between very low and very high create a bimodal distribution.'),
  t('Statistical Significance', 'A result unlikely to have occurred by chance, often reported with a p-value below .05.', 'Statistics', 'unlikely to have occurred by chance', 'A p-value of .03 indicates statistical significance.'),
  t('Effect Sizes', 'Statistics that describe how large a difference or relationship is, beyond whether it is significant.', 'Statistics', 'how large a difference', 'A small p-value with a tiny effect size means the difference is real but minor.'),
  t('Meta Analysis', 'A statistical technique that combines results from many studies to estimate an overall effect.', 'Statistics', 'combines results from many studies', 'A meta-analysis of therapy studies estimates how effective therapy is overall.'),

  // Ethics
  t('Institutional Review Boards (IRB)', 'Committees that review research proposals to ensure ethical treatment of human participants.', 'Ethics & Argument', 'review research proposals', 'An IRB must approve a study before researchers can recruit participants.', ['IRB']),
  t('Informed Consent', 'Participants\' agreement to take part in research after being told what it involves and any risks.', 'Ethics & Argument', 'agreement after being told', 'A participant signing a form after a researcher explains the study is giving informed consent.'),
  t('Informed Assent', 'Agreement to participate by minors or others who cannot legally give consent, alongside guardian consent.', 'Ethics & Argument', 'agreement by minors', 'Children sign assent forms while their parents provide formal consent.'),
  t('Confidentiality', 'The protection of participants\' identities and personal data.', 'Ethics & Argument', 'protection of identities', 'Researchers protect confidentiality by storing data without names attached.'),
  t('Deception', 'Misleading participants about the true purpose of a study, only when justified and with debriefing.', 'Ethics & Argument', 'misleading participants', 'Telling participants a study is about memory when it is actually about stress is deception.'),
  t('Confederates', 'People who pretend to be participants but are actually working with the researcher.', 'Ethics & Argument', 'pretend to be participants', "In Asch's conformity study, confederates gave wrong answers on purpose."),
  t('Debriefing', 'Explaining the true purpose of a study to participants after it ends.', 'Ethics & Argument', 'explaining the true purpose', 'Researchers debrief participants to address any deception or distress.'),
  t('Article Analysis Question (AAQ)', 'A type of AP Psychology question that asks students to analyze a research article or summary.', 'Ethics & Argument', 'analyze a research article', 'An AAQ may ask you to identify the IV, DV, and a flaw in a study.', ['AAQ']),
  t('Evidence-Based Question (EBQ)', 'A type of AP Psychology question that requires building a defensible claim from multiple sources.', 'Ethics & Argument', 'defensible claim from multiple sources', 'An EBQ asks you to combine evidence across studies to support a position.', ['EBQ']),
  t('Defensible Claim', 'A clear, specific assertion that can be supported with evidence and reasoning.', 'Ethics & Argument', 'supported with evidence and reasoning', 'A defensible claim names a specific finding rather than a vague opinion.'),
];

export const PAIRS = [
  ['Independent Variable', 'Dependent Variable'],
  ['Experimental Group', 'Control Group'],
  ['Single-Blind Study', 'Double-Blind Study'],
  ['Reliability', 'Validity'],
  ['Quantitative Data', 'Qualitative Data'],
  ['Mean', 'Median'],
  ['Positive Skew', 'Negative Skew'],
  ['Positive Correlation', 'Negative Correlation'],
  ['Random Sample', 'Representative Sample'],
  ['Confirmation Bias', 'Hindsight Bias'],
  ['Hindsight Bias', 'Overconfidence'],
  ['Informed Consent', 'Informed Assent'],
  ['Deception', 'Debriefing'],
  ['Article Analysis Question (AAQ)', 'Evidence-Based Question (EBQ)'],
  ['Descriptive Statistics', 'Inferential Statistics'],
  ['Behavioral Perspective', 'Cognitive Perspective'],
  ['Psychodynamic Perspective', 'Humanistic Perspective'],
  ['Biological Perspective', 'Sociocultural Perspective'],
];

export const KEY_CONCEPTS = [
  { term: 'Experimental Method', why: 'Only method that can show causation — backbone of every research FRQ.' },
  { term: 'Confounding Variable', why: 'Asked on AAQs as the #1 design flaw to identify.' },
  { term: 'Random Assignment', why: 'Distinguishes experiments from correlational studies — high-frequency MCQ.' },
  { term: 'Correlation Coefficient', why: 'Know that correlation ≠ causation; sign and magnitude both matter.' },
  { term: 'Statistical Significance', why: 'Connect p-values to inferential statistics on EBQs.' },
  { term: 'Operational Definitions', why: 'Required for any defensible claim in an AAQ/EBQ.' },
  { term: 'Double-Blind Study', why: 'Best defense against placebo and experimenter bias — standard answer.' },
  { term: 'Informed Consent', why: 'Top ethics question on every test.' },
];
