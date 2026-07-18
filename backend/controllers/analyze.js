const {Groq}=require("groq-sdk");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const groq=new Groq({apiKey: process.env.GROQ_API_KEY});

function detectGaps(business){
    const gaps=[];
    if(!business.website) gaps.push("No website");
    if(!business.phone) gaps.push("No phone number listed");
    if(!business.email) gaps.push("No email address");
    if(!business.name) gaps.push("Business name Missing");
    return gaps;

}
const analyzeGaps = asyncHandler(async (req,res) => {
        const {name,phone,website,email}=req.body;
        const gaps=detectGaps({name,phone,website,email});
    if(gaps.length===0){
        return sendSuccess(res, 200, "Business analysis completed", {
            gaps:[],
            pitch_angle:"This Business has a complete Presence .",
            pitchAngle:"This Business has a complete Presence .",
            priority:"low",
            score:100
        })
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
return sendSuccess(res, 200, "Business analysis completed", {
    ...parsed,
    pitchAngle: parsed.pitch_angle,
});
});

module.exports={analyzeGaps};
