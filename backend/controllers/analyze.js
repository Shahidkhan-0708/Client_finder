const {Groq}=require("groq-sdk");
const groq=new Groq({apiKey: process.env.GROQ_API_KEY});

function detectGaps(business){
    const gaps=[];
    if(!business.website) gaps.push("No website");
    if(!business.phone) gaps.push("No phone number listed");
    if(!business.email) gaps.push("No email address");
    if(!business.name) gaps.push("Business name Missing");
    return gaps;

}
async function analyzeGaps(req,res){
    try{
        const {name,phone,website,email}=req.body;
        if(!name && !phone && !website && !email){
         return res.status(400).json({err:"No business data provided"})
        }
        const gaps=detectGaps({name,phone,website,email});
    if(gaps.length===0){
        return res.json({gaps:[],pitch_angle:"This Business has a complete Presence .",priority:"low",score:100})
    }
 
    const prompt=`You are a B2B sales assistant identify digital marketing opportunities
    Business Info:
    Name:${name||"Unknown"}
    phone:${phone||"Not listed"}
    website:${website||"Not listed"}
    Email:${email||"not listed"}
    Identified Gaps:${gaps.join(", ")}

    Respond ONLY in this exact JSON format (no markdown, no extra text):
{
  "gaps": ["gap1", "gap2"],
  "pitch_angle": "One sentence pitch to sell them your service",
  "priority": "high | medium | low",
  "score": <number 0-100>
}
    `;
const result=await groq.chat.completions.create({
    model:"llama-3.3-70b-versatile",
    messages:[{role: "user", content: prompt}],
    temperature: 0.3,
});
const rawText=result.choices[0].message.content;
const cleaned=rawText.replace(/```json|```/g, "").trim();
const parsed=JSON.parse(cleaned);
return res.json(parsed);
    }catch(err){
        console.log("error aya hai")
        console.error("analyze error: ",err.message);
        return res.status(500).json({error:"Analysis Failed",details:err.message});

    }

}
module.exports={analyzeGaps};