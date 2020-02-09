using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        //{{url}}/api/activities/
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;

        }

        //{{url}}/api/activities/3eccaab3-3252-45c8-beda-21a25a5edad6
        //cancelation token is implemented in list.cs 
        //when user cancels their requests or refreshes our application will also stop oif list.cs and
        // the apicontorller are configured with an cancellationToken
        //we wont use cancellation toke nout of this project from here on due to complexity
        [HttpGet]

        public async Task<ActionResult<List<Activity>>> List(CancellationToken ct)
        {
            return await _mediator.Send(new List.Query(), ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query{Id = id});
        }
    }
}