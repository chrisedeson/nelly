/**
 * Tool Logo Utility
 *
 * Central location for project management and collaboration tool logo mapping.
 * Maps tool names to their logo URLs using Clearbit's logo API.
 */

export const getToolLogo = (toolName?: string): string => {
  if (!toolName) return "";

  const name = toolName.toLowerCase().trim();

  // Map of tool names to their logo URLs
  const toolLogos: Record<string, string> = {
    // Project Management & Task Tracking
    'jira': 'https://logo.clearbit.com/atlassian.com',
    'atlassian': 'https://logo.clearbit.com/atlassian.com',
    'asana': 'https://logo.clearbit.com/asana.com',
    'trello': 'https://logo.clearbit.com/trello.com',
    'clickup': 'https://logo.clearbit.com/clickup.com',
    'monday': 'https://logo.clearbit.com/monday.com',
    'monday.com': 'https://logo.clearbit.com/monday.com',
    'notion': 'https://logo.clearbit.com/notion.so',
    'basecamp': 'https://logo.clearbit.com/basecamp.com',
    'wrike': 'https://logo.clearbit.com/wrike.com',
    'smartsheet': 'https://logo.clearbit.com/smartsheet.com',
    'airtable': 'https://logo.clearbit.com/airtable.com',
    'linear': 'https://logo.clearbit.com/linear.app',
    'height': 'https://logo.clearbit.com/height.app',
    'shortcut': 'https://logo.clearbit.com/shortcut.com',
    'teamwork': 'https://logo.clearbit.com/teamwork.com',
    'workfront': 'https://logo.clearbit.com/workfront.com',
    'azure devops': 'https://logo.clearbit.com/microsoft.com',
    'ado': 'https://logo.clearbit.com/microsoft.com',

    // Communication & Collaboration
    'slack': 'https://logo.clearbit.com/slack.com',
    'microsoft teams': 'https://logo.clearbit.com/microsoft.com',
    'teams': 'https://logo.clearbit.com/microsoft.com',
    'discord': 'https://logo.clearbit.com/discord.com',
    'zoom': 'https://logo.clearbit.com/zoom.us',
    'google meet': 'https://logo.clearbit.com/google.com',
    'meet': 'https://logo.clearbit.com/google.com',
    'skype': 'https://logo.clearbit.com/skype.com',
    'webex': 'https://logo.clearbit.com/webex.com',
    'cisco webex': 'https://logo.clearbit.com/webex.com',
    'mattermost': 'https://logo.clearbit.com/mattermost.com',
    'rocket.chat': 'https://logo.clearbit.com/rocket.chat',
    'telegram': 'https://logo.clearbit.com/telegram.org',
    'whatsapp': 'https://logo.clearbit.com/whatsapp.com',

    // Cloud Storage & File Sharing
    'dropbox': 'https://logo.clearbit.com/dropbox.com',
    'google drive': 'https://logo.clearbit.com/google.com',
    'drive': 'https://logo.clearbit.com/google.com',
    'box': 'https://logo.clearbit.com/box.com',
    'onedrive': 'https://logo.clearbit.com/microsoft.com',
    'sharepoint': 'https://logo.clearbit.com/microsoft.com',
    'nextcloud': 'https://logo.clearbit.com/nextcloud.com',
    'owncloud': 'https://logo.clearbit.com/owncloud.com',
    'mega': 'https://logo.clearbit.com/mega.nz',
    'sync': 'https://logo.clearbit.com/sync.com',

    // Development Tools
    'github': 'https://logo.clearbit.com/github.com',
    'gitlab': 'https://logo.clearbit.com/gitlab.com',
    'bitbucket': 'https://logo.clearbit.com/bitbucket.org',
    'jenkins': 'https://logo.clearbit.com/jenkins.io',
    'circleci': 'https://logo.clearbit.com/circleci.com',
    'travis ci': 'https://logo.clearbit.com/travis-ci.com',
    'travis': 'https://logo.clearbit.com/travis-ci.com',
    'docker': 'https://logo.clearbit.com/docker.com',
    'kubernetes': 'https://logo.clearbit.com/kubernetes.io',
    'terraform': 'https://logo.clearbit.com/hashicorp.com',
    'ansible': 'https://logo.clearbit.com/ansible.com',
    'puppet': 'https://logo.clearbit.com/puppet.com',
    'chef': 'https://logo.clearbit.com/chef.io',
    'aws': 'https://logo.clearbit.com/aws.amazon.com',
    'amazon web services': 'https://logo.clearbit.com/aws.amazon.com',
    'azure': 'https://logo.clearbit.com/microsoft.com',
    'gcp': 'https://logo.clearbit.com/cloud.google.com',
    'google cloud': 'https://logo.clearbit.com/cloud.google.com',
    'heroku': 'https://logo.clearbit.com/heroku.com',
    'vercel': 'https://logo.clearbit.com/vercel.com',
    'netlify': 'https://logo.clearbit.com/netlify.com',
    'digitalocean': 'https://logo.clearbit.com/digitalocean.com',
    'linode': 'https://logo.clearbit.com/linode.com',
    'cloudflare': 'https://logo.clearbit.com/cloudflare.com',

    // Design & Creative Tools
    'figma': 'https://logo.clearbit.com/figma.com',
    'sketch': 'https://logo.clearbit.com/sketch.com',
    'adobe xd': 'https://logo.clearbit.com/adobe.com',
    'xd': 'https://logo.clearbit.com/adobe.com',
    'invision': 'https://logo.clearbit.com/invisionapp.com',
    'zeplin': 'https://logo.clearbit.com/zeplin.io',
    'framer': 'https://logo.clearbit.com/framer.com',
    'canva': 'https://logo.clearbit.com/canva.com',
    'photoshop': 'https://logo.clearbit.com/adobe.com',
    'illustrator': 'https://logo.clearbit.com/adobe.com',
    'adobe': 'https://logo.clearbit.com/adobe.com',
    'procreate': 'https://logo.clearbit.com/procreate.art',
    'affinity': 'https://logo.clearbit.com/affinity.serif.com',

    // Payment & Finance
    'stripe': 'https://logo.clearbit.com/stripe.com',
    'paypal': 'https://logo.clearbit.com/paypal.com',
    'square': 'https://logo.clearbit.com/squareup.com',
    'braintree': 'https://logo.clearbit.com/braintreepayments.com',
    'adyen': 'https://logo.clearbit.com/adyen.com',
    'authorize.net': 'https://logo.clearbit.com/authorize.net',
    'authorize': 'https://logo.clearbit.com/authorize.net',
    'klarna': 'https://logo.clearbit.com/klarna.com',
    'affirm': 'https://logo.clearbit.com/affirm.com',
    'plaid': 'https://logo.clearbit.com/plaid.com',
    'quickbooks': 'https://logo.clearbit.com/quickbooks.intuit.com',
    'xero': 'https://logo.clearbit.com/xero.com',
    'freshbooks': 'https://logo.clearbit.com/freshbooks.com',
    'wave': 'https://logo.clearbit.com/waveapps.com',

    // HR & Payroll
    'paychex': 'https://logo.clearbit.com/paychex.com',
    'adp': 'https://logo.clearbit.com/adp.com',
    'gusto': 'https://logo.clearbit.com/gusto.com',
    'bamboohr': 'https://logo.clearbit.com/bamboohr.com',
    'workday': 'https://logo.clearbit.com/workday.com',
    'namely': 'https://logo.clearbit.com/namely.com',
    'rippling': 'https://logo.clearbit.com/rippling.com',
    'zenefits': 'https://logo.clearbit.com/zenefits.com',
    'justworks': 'https://logo.clearbit.com/justworks.com',
    'greenhouse': 'https://logo.clearbit.com/greenhouse.io',
    'lever': 'https://logo.clearbit.com/lever.co',
    'workable': 'https://logo.clearbit.com/workable.com',

    // CRM & Sales
    'salesforce': 'https://logo.clearbit.com/salesforce.com',
    'hubspot': 'https://logo.clearbit.com/hubspot.com',
    'zoho': 'https://logo.clearbit.com/zoho.com',
    'pipedrive': 'https://logo.clearbit.com/pipedrive.com',
    'freshsales': 'https://logo.clearbit.com/freshworks.com',
    'freshworks': 'https://logo.clearbit.com/freshworks.com',
    'zendesk': 'https://logo.clearbit.com/zendesk.com',
    'intercom': 'https://logo.clearbit.com/intercom.com',
    'drift': 'https://logo.clearbit.com/drift.com',
    'close': 'https://logo.clearbit.com/close.com',
    'copper': 'https://logo.clearbit.com/copper.com',

    // Analytics & Monitoring
    'google analytics': 'https://logo.clearbit.com/google.com',
    'analytics': 'https://logo.clearbit.com/google.com',
    'mixpanel': 'https://logo.clearbit.com/mixpanel.com',
    'amplitude': 'https://logo.clearbit.com/amplitude.com',
    'segment': 'https://logo.clearbit.com/segment.com',
    'heap': 'https://logo.clearbit.com/heap.io',
    'hotjar': 'https://logo.clearbit.com/hotjar.com',
    'fullstory': 'https://logo.clearbit.com/fullstory.com',
    'datadog': 'https://logo.clearbit.com/datadoghq.com',
    'new relic': 'https://logo.clearbit.com/newrelic.com',
    'newrelic': 'https://logo.clearbit.com/newrelic.com',
    'splunk': 'https://logo.clearbit.com/splunk.com',
    'grafana': 'https://logo.clearbit.com/grafana.com',
    'prometheus': 'https://logo.clearbit.com/prometheus.io',
    'elastic': 'https://logo.clearbit.com/elastic.co',
    'elasticsearch': 'https://logo.clearbit.com/elastic.co',
    'sentry': 'https://logo.clearbit.com/sentry.io',
    'logrocket': 'https://logo.clearbit.com/logrocket.com',
    'pendo': 'https://logo.clearbit.com/pendo.io',

    // Marketing & Email
    'mailchimp': 'https://logo.clearbit.com/mailchimp.com',
    'sendgrid': 'https://logo.clearbit.com/sendgrid.com',
    'mailgun': 'https://logo.clearbit.com/mailgun.com',
    'constant contact': 'https://logo.clearbit.com/constantcontact.com',
    'campaign monitor': 'https://logo.clearbit.com/campaignmonitor.com',
    'convertkit': 'https://logo.clearbit.com/convertkit.com',
    'klaviyo': 'https://logo.clearbit.com/klaviyo.com',
    'marketo': 'https://logo.clearbit.com/marketo.com',
    'pardot': 'https://logo.clearbit.com/salesforce.com',
    'eloqua': 'https://logo.clearbit.com/oracle.com',
    'active campaign': 'https://logo.clearbit.com/activecampaign.com',
    'activecampaign': 'https://logo.clearbit.com/activecampaign.com',
    'brevo': 'https://logo.clearbit.com/brevo.com',
    'sendinblue': 'https://logo.clearbit.com/brevo.com',

    // Documentation & Knowledge Base
    'confluence': 'https://logo.clearbit.com/atlassian.com',
    'notion': 'https://logo.clearbit.com/notion.so',
    'google docs': 'https://logo.clearbit.com/google.com',
    'docs': 'https://logo.clearbit.com/google.com',
    'microsoft word': 'https://logo.clearbit.com/microsoft.com',
    'word': 'https://logo.clearbit.com/microsoft.com',
    'evernote': 'https://logo.clearbit.com/evernote.com',
    'obsidian': 'https://logo.clearbit.com/obsidian.md',
    'roam': 'https://logo.clearbit.com/roamresearch.com',
    'gitbook': 'https://logo.clearbit.com/gitbook.com',
    'readme': 'https://logo.clearbit.com/readme.com',
    'docusaurus': 'https://logo.clearbit.com/docusaurus.io',

    // E-commerce & Shopping
    'shopify': 'https://logo.clearbit.com/shopify.com',
    'woocommerce': 'https://logo.clearbit.com/woocommerce.com',
    'magento': 'https://logo.clearbit.com/magento.com',
    'bigcommerce': 'https://logo.clearbit.com/bigcommerce.com',
    'squarespace': 'https://logo.clearbit.com/squarespace.com',
    'wix': 'https://logo.clearbit.com/wix.com',
    'wordpress': 'https://logo.clearbit.com/wordpress.com',
    'webflow': 'https://logo.clearbit.com/webflow.com',

    // Testing & QA
    'selenium': 'https://logo.clearbit.com/selenium.dev',
    'cypress': 'https://logo.clearbit.com/cypress.io',
    'playwright': 'https://logo.clearbit.com/playwright.dev',
    'testcafe': 'https://logo.clearbit.com/testcafe.io',
    'browserstack': 'https://logo.clearbit.com/browserstack.com',
    'sauce labs': 'https://logo.clearbit.com/saucelabs.com',
    'postman': 'https://logo.clearbit.com/postman.com',
    'insomnia': 'https://logo.clearbit.com/insomnia.rest',
    'jest': 'https://logo.clearbit.com/jestjs.io',
    'mocha': 'https://logo.clearbit.com/mochajs.org',

    // Database & Backend Services
    'mongodb': 'https://logo.clearbit.com/mongodb.com',
    'postgresql': 'https://logo.clearbit.com/postgresql.org',
    'postgres': 'https://logo.clearbit.com/postgresql.org',
    'mysql': 'https://logo.clearbit.com/mysql.com',
    'redis': 'https://logo.clearbit.com/redis.io',
    'firebase': 'https://logo.clearbit.com/firebase.google.com',
    'supabase': 'https://logo.clearbit.com/supabase.com',
    'planetscale': 'https://logo.clearbit.com/planetscale.com',
    'cockroachdb': 'https://logo.clearbit.com/cockroachlabs.com',
    'cassandra': 'https://logo.clearbit.com/cassandra.apache.org',
    'dynamodb': 'https://logo.clearbit.com/aws.amazon.com',
    'snowflake': 'https://logo.clearbit.com/snowflake.com',
    'databricks': 'https://logo.clearbit.com/databricks.com',

    // Security & Authentication
    'auth0': 'https://logo.clearbit.com/auth0.com',
    'okta': 'https://logo.clearbit.com/okta.com',
    'onelogin': 'https://logo.clearbit.com/onelogin.com',
    '1password': 'https://logo.clearbit.com/1password.com',
    'lastpass': 'https://logo.clearbit.com/lastpass.com',
    'bitwarden': 'https://logo.clearbit.com/bitwarden.com',
    'dashlane': 'https://logo.clearbit.com/dashlane.com',
    'duo': 'https://logo.clearbit.com/duo.com',
    'yubikey': 'https://logo.clearbit.com/yubico.com',
    'cloudflare': 'https://logo.clearbit.com/cloudflare.com',

    // Social Media & Content
    'twitter': 'https://logo.clearbit.com/twitter.com',
    'x': 'https://logo.clearbit.com/twitter.com',
    'facebook': 'https://logo.clearbit.com/facebook.com',
    'meta': 'https://logo.clearbit.com/facebook.com',
    'instagram': 'https://logo.clearbit.com/instagram.com',
    'linkedin': 'https://logo.clearbit.com/linkedin.com',
    'youtube': 'https://logo.clearbit.com/youtube.com',
    'tiktok': 'https://logo.clearbit.com/tiktok.com',
    'reddit': 'https://logo.clearbit.com/reddit.com',
    'pinterest': 'https://logo.clearbit.com/pinterest.com',
    'snapchat': 'https://logo.clearbit.com/snapchat.com',
    'buffer': 'https://logo.clearbit.com/buffer.com',
    'hootsuite': 'https://logo.clearbit.com/hootsuite.com',
    'sprout social': 'https://logo.clearbit.com/sproutsocial.com',

    // Customer Support
    'zendesk': 'https://logo.clearbit.com/zendesk.com',
    'freshdesk': 'https://logo.clearbit.com/freshdesk.com',
    'help scout': 'https://logo.clearbit.com/helpscout.com',
    'helpscout': 'https://logo.clearbit.com/helpscout.com',
    'front': 'https://logo.clearbit.com/front.com',
    'gorgias': 'https://logo.clearbit.com/gorgias.com',
    'crisp': 'https://logo.clearbit.com/crisp.chat',
    'tidio': 'https://logo.clearbit.com/tidio.com',
    'livechat': 'https://logo.clearbit.com/livechat.com',
    'olark': 'https://logo.clearbit.com/olark.com',

    // API & Integration Platforms
    'zapier': 'https://logo.clearbit.com/zapier.com',
    'ifttt': 'https://logo.clearbit.com/ifttt.com',
    'make': 'https://logo.clearbit.com/make.com',
    'integromat': 'https://logo.clearbit.com/make.com',
    'n8n': 'https://logo.clearbit.com/n8n.io',
    'mulesoft': 'https://logo.clearbit.com/mulesoft.com',
    'tray.io': 'https://logo.clearbit.com/tray.io',
    'workato': 'https://logo.clearbit.com/workato.com',

    // Time Tracking & Productivity
    'toggl': 'https://logo.clearbit.com/toggl.com',
    'harvest': 'https://logo.clearbit.com/getharvest.com',
    'clockify': 'https://logo.clearbit.com/clockify.me',
    'timely': 'https://logo.clearbit.com/timelyapp.com',
    'rescuetime': 'https://logo.clearbit.com/rescuetime.com',
    'forest': 'https://logo.clearbit.com/forestapp.cc',
    'focus@will': 'https://logo.clearbit.com/focusatwill.com',
    'todoist': 'https://logo.clearbit.com/todoist.com',
    'any.do': 'https://logo.clearbit.com/any.do',
    'things': 'https://logo.clearbit.com/culturedcode.com',
    'omnifocus': 'https://logo.clearbit.com/omnigroup.com',

    // Video Editing & Streaming
    'obs': 'https://logo.clearbit.com/obsproject.com',
    'streamlabs': 'https://logo.clearbit.com/streamlabs.com',
    'twitch': 'https://logo.clearbit.com/twitch.tv',
    'loom': 'https://logo.clearbit.com/loom.com',
    'vimeo': 'https://logo.clearbit.com/vimeo.com',
    'wistia': 'https://logo.clearbit.com/wistia.com',
    'vidyard': 'https://logo.clearbit.com/vidyard.com',
    'premiere': 'https://logo.clearbit.com/adobe.com',
    'final cut': 'https://logo.clearbit.com/apple.com',
    'davinci resolve': 'https://logo.clearbit.com/blackmagicdesign.com',
  };

  // Try to find a matching tool logo
  for (const [key, logo] of Object.entries(toolLogos)) {
    if (name.includes(key)) {
      return logo;
    }
  }

  // Fallback: try to construct a Clearbit URL from the tool name
  // Remove common words and special characters
  const cleanName = name
    .replace(/\s+(inc|llc|corp|ltd|limited|software|app|platform)\b/gi, '')
    .replace(/[^\w\s]/g, '')
    .trim()
    .replace(/\s+/g, '');

  if (cleanName) {
    return `https://logo.clearbit.com/${cleanName}.com`;
  }

  // Return empty string to use fallback icon
  return "";
};

/**
 * Get category for a tool (for filtering/grouping)
 */
export const getToolCategory = (toolName?: string): string => {
  if (!toolName) return "Other";

  const name = toolName.toLowerCase().trim();

  const categories: Record<string, string[]> = {
    "Project Management": ['jira', 'asana', 'trello', 'clickup', 'monday', 'notion', 'basecamp', 'wrike', 'linear', 'height'],
    "Communication": ['slack', 'teams', 'discord', 'zoom', 'meet', 'skype', 'webex'],
    "Cloud Storage": ['dropbox', 'drive', 'box', 'onedrive', 'sharepoint'],
    "Development": ['github', 'gitlab', 'bitbucket', 'jenkins', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'vercel', 'netlify'],
    "Design": ['figma', 'sketch', 'xd', 'invision', 'canva', 'photoshop', 'illustrator'],
    "Payment": ['stripe', 'paypal', 'square', 'braintree', 'adyen'],
    "HR & Payroll": ['paychex', 'adp', 'gusto', 'bamboohr', 'workday', 'rippling'],
    "CRM & Sales": ['salesforce', 'hubspot', 'zoho', 'pipedrive', 'zendesk', 'intercom'],
    "Analytics": ['analytics', 'mixpanel', 'amplitude', 'segment', 'heap', 'hotjar', 'datadog', 'elastic'],
    "Marketing": ['mailchimp', 'sendgrid', 'mailgun', 'klaviyo', 'marketo'],
    "E-commerce": ['shopify', 'woocommerce', 'magento', 'bigcommerce', 'squarespace', 'webflow'],
    "Testing": ['selenium', 'cypress', 'playwright', 'browserstack', 'postman'],
    "Database": ['mongodb', 'postgresql', 'mysql', 'redis', 'firebase', 'supabase'],
    "Security": ['auth0', 'okta', '1password', 'lastpass', 'bitwarden'],
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => name.includes(keyword))) {
      return category;
    }
  }

  return "Other";
};
