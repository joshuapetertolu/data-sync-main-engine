const fs = require('fs');
const { execSync } = require('child_process');

async function start() {
    const startDate = new Date('2022-01-01T09:00:00');
    const endDate = new Date('2023-12-31T23:59:59');
    
    // Replace this with a friend's email or a second email of your own
    const coAuthor = "Co-authored-by: Collaborator <ayo4real26@gmail.com>";

    console.log("🚀 Syncing with Co-author for Pair Extraordinaire badge...");

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        if (Math.random() > 0.2) {
            const dailyCommits = Math.floor(Math.random() * 3) + 1;

            for (let j = 0; j < dailyCommits; j++) {
                currentDate.setHours(10 + j);
                const commitDate = currentDate.toISOString();
                
                fs.writeFileSync('data.json', JSON.stringify({ date: commitDate }));

                // The commit message MUST have two newlines before the Co-authored-by tag
                const message = `Archive sync: ${currentDate.toDateString()}\n\n${coAuthor}`;

                try {
                    execSync('git add data.json');
                    execSync(`git commit -m "${message}" --date="${commitDate}"`, {
                        env: {
                            ...process.env,
                            GIT_AUTHOR_DATE: commitDate,
                            GIT_COMMITTER_DATE: commitDate
                        }
                    });
                } catch (e) {}
            }
        }
        currentDate.setDate(currentDate.getDate() + 1);
        if (currentDate.getDate() === 1) console.log(`Processing: ${currentDate.getFullYear()}-${currentDate.getMonth() + 1}`);
    }
    console.log("✅ DONE. History with Co-author created.");
}

start();